import json
import os
import random
from datetime import datetime

from flask import (Flask, Response, flash, jsonify, make_response, redirect,
                   render_template, request)
from flask import session as login_session
from flask import url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from app.assets.options import facilities, others
from app.assets.request_message_map import *
from app.bluePrints.auth import authetication
from app.db.crud import *
from app.db.database_setup import Base, Favorite, Room, User
from app.util.aws.s3 import get_images
from app.util.env_setup import set_backend_config
from app.util.util import *

aws_landlord_endpoint = "https://houseit.s3.us-east-2.amazonaws.com/landlord/landlord_rooms.json"


def create_app(test_config=None):
    try:
        backend_config = json.loads(os.environ["BACKEND_CONFIG"])
    except KeyError:
        # path not yet set
        set_backend_config()
        backend_config = json.loads(os.environ["BACKEND_CONFIG"])
    backend_config["ALLOWED_ORIGINS"] = set(backend_config["ALLOWED_ORIGINS"])
    app = Flask(__name__)
    app.debug = True
    app.config.update(backend_config)
    app.secret_key = app.config["FLASK_SECRET_KEY"]
    if test_config:
        app.config.update(test_config)
    db = SQLAlchemy(app)
    app.register_blueprint(authetication)
    session = db.create_scoped_session()
    app.config["DB_CONNECTION"] = session
    set_landlord_data(app, aws_landlord_endpoint)
    CORS(app, supports_credentials=True)

    @ app.route("/profile", methods=["POST", "OPTIONS"])
    def edit_profile():
        """Function to let users edit their existing profiles
        edit profile photo currently is disabled

        content_type: application/json

        example of valid json request format:

        "updates": {"name": "Thanos",
                    "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
                    "phone": "858-888-2345",
                    "major": "MARVEL SOCIOECONOMICS",
                    "school_year": "Third"}
        """
        # handle pre-flight for browsers CORS access
        if request.method == "OPTIONS":
            return generate_response()
        # part1: verify that user has logged in and the request is legit
        checked_and_verified, response = check_verify_token(
            request, login_session)
        if checked_and_verified != True:
            return response
        # handle the edge case where user is authorized to perform create user but not other method
        if not is_loggedin(login_session):
            response = generate_message(MESSAGE_USER_NOT_LOGGED_IN, 401)
            return response
        # part2: check json
        checked_json, response, requested_json = check_json_form(
            request, MESSAGE_BAD_JSON, MESSAGE_CREATE_USER_NO_JSON)
        if checked_json != True:
            return response
        # part3: verify json data
        try:
            user_email = login_session["login_user_email"]
        except KeyError:
            # key error means we are offline til this far
            user_email = requested_json["email"]
        # design decision: if there are invalid field names, only update the valid fields.
        # check updates keys and formats
        try:
            update_pairs = convert_to_underscore(requested_json["updates"])

            if isinstance(update_pairs, dict) != True:
                response = generate_message(
                    MESSAGE_UPDATE_PROFILE_NON_DICT, 400)
            else:
                correct_format, valid_update_pairs, response = process_request_json(
                    User, update_pairs)
                if correct_format == True:
                    update_field(User, session, {
                                 "email": user_email}, valid_update_pairs)
                    response = generate_message(
                        MESSAGE_UPDATE_PROFILE_SUCCESS, 200)
        except KeyError:
            response = generate_message(MESSAGE_UPDATE_PROFILE_NO_ENTRY, 400)
        return response

    @ app.route("/updateLandlordJson")
    def updateLandlordJson():
        set_landlord_data(app, aws_landlord_endpoint)
        return generate_message({"newest number of entries": len(app.config["LANDLORD_DB"])}, 200)

    # This needs to be unit tested + error handling
    @ app.route("/getRecentLandlordRooms/<room_id>")
    def get_recent_landlord_rooms(room_id):
        try:
            room_id = int(room_id)
            if room_id > len(app.config["LANDLORD_DB"]) or room_id < 1:
                raise ValueError
            room_entry = app.config["LANDLORD_DB"][room_id - 1]
        except ValueError:
            room_entry = None
        if room_entry is None:
            room_entry = {"name": -1}
            status_code = 404
        else:
            status_code = 200
        return generate_response(room_entry, status_code)

    # This needs to be unit tested + error handling
    @ app.route("/getRecentLandlordRoomIds")
    def get_recent_landlord_room_ids():
        room_ids = list(range(1, len(app.config["LANDLORD_DB"])+1))
        return generate_response(elem=room_ids)

    @ app.route("/getRecentStudentRoomIds")
    def get_recent_rooms():
        """
        Get recent rooms sorted by date created

        no additional request params needed
        """
        rooms_db = read_all(Room, session)
        rooms_db.sort(key=lambda elem: elem.date_created, reverse=True)
        room_ids = [room.id for room in rooms_db]
        return generate_response(elem=room_ids)

    @ app.route("/sendEmail", methods=["POST", "OPTIONS"])
    def send_email():
        # handle pre-flight for browsers CORS access
        if request.method == "OPTIONS":
            return generate_response()
        # part2: check json
        checked_json, response, requested_json = check_json_form(
            request, MESSAGE_BAD_JSON, MESSAGE_SEND_EMAIL_NO_JSON)
        if checked_json != True:
            return response
        # part3: try send email
        try:
            email_content = requested_json["content"]
            # TODO: Put send email here
            return generate_message({"message": "successfully sent!"})
        except KeyError:
            status_code = 400
            return generate_message({"message": "No content is provided"}, status_code)

    @ app.route("/getRecentStudentRooms/<room_id>")
    def get_room(room_id):
        """
        Get room of particular id
        room_id has to be an integer or an integer in a string form
        """
        try:
            room_id = int(room_id)
            room_entry = read_criteria(Room, {"id": room_id}, session)
        except ValueError:
            room_entry = None
        # if the provided id doesn't match any room in the db, return -1 to indicate not found
        if room_entry is None:
            room = {"roomId": -1}
            status_code = 404
        else:
            status_code = 200
            room = room_json(room_entry, session,
                             app.config["OFFLINE_TESTING"], login_session)
        return generate_response(room, status_code)

    @ app.route("/postRoom", methods=["POST", "OPTIONS"])
    def post_rooms():
        """
        The end point for posting new rooms

        request content type supported: multipart/form-data

        example of valid json request format:

        "json": 
            {"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["haha"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}
        """
        # handle pre-flight for browsers CORS access
        if request.method == "OPTIONS":
            return generate_response()
        # part1: verify that the request is legit
        session = app.config["DB_CONNECTION"]
        # verify the token
        checked_and_verified, response = check_verify_token(
            request, login_session)
        if checked_and_verified == False:
            return response
        # handle the edge case where user is authorized to perform create user but not other method
        if not is_loggedin(login_session):
            response = generate_message(MESSAGE_USER_NOT_LOGGED_IN, 401)
            return response
        # only upload pictures that are valid
        photos = request.files.getlist("photos")
        valid_photos = [p for p in photos if verify_image(p) != "error"]
        # verify header
        if not request.content_type.startswith(REQUEST_TYPE_MULIFORM):
            response = generate_message(
                MESSAGE_WRONG_REQUEST_HEADER+REQUEST_TYPE_MULIFORM, 415)
            return response
        # if all images are invalid, return error response
        # we treat empty list and a list of all invalid files the same
        if len(valid_photos) == 0:
            response = generate_message(
                MESSAGE_MULTI_FORM_ALL_FILES_INVALID, 400)
            return response
        check_status, response, requested_json = check_multi_form_json(request)
        if check_status == False:
            return response
        # preprocess json data like date time conversions
        correct_format, requested_json, response = make_a_post_processor(
            requested_json)
        if correct_format == False:
            return response
        # check room first
        correct_format, valid_update_pairs, response = process_request_json(
            Room, requested_json, True, True)
        if correct_format == False:
            return response
        # check attributes second
        correct_format, valid_value_pairs, response = check_attributes_str(
            valid_update_pairs)
        if correct_format == False:
            return response
        requested_json["photos"] = valid_photos
        upload_status = write_room(
            requested_json, login_session["user_id"], session, app.config["OFFLINE_TESTING"], app.config["TESTING"])
        message, status_code = MESSAGE_CREATE_ROOM_SUCCESS, 201
        if not upload_status:
            message, status_code = S3_BUCKET_UPLOAD_ERROR, 503
        return generate_message(message, status_code)

    @ app.route("/favorite", methods=["POST", "OPTIONS", "GET"])
    def favorite():
        """
        The end point for adding favorites

        user has to log in to use all the methods

        Get: no additional args are needed
        POST: add, delete

        content_type: application/json

        example of valid json request format:

        {"action": action(string), "room_id":room_id(integer)}

        """
        # handle pre-flight for browsers CORS access
        if request.method == "OPTIONS":
            return generate_response()
        # part1: verify the token
        checked_and_verified, response = check_verify_token(
            request, login_session)
        if checked_and_verified == False:
            return response
        # handle the edge case where user is authorized to perform create user but not other method
        if not is_loggedin(login_session):
            response = generate_message(MESSAGE_USER_NOT_LOGGED_IN, 401)
            return response
        # handles the get request
        if request.method == "GET":
            favorites = read_criteria(
                Favorite, {"user_id": login_session["user_id"]}, session, "m") or []
            favorites_room_json = [room_json(
                favorite.room, session, app.config["OFFLINE_TESTING"], login_session) for favorite in favorites]
            return generate_response(elem={"favorites": favorites_room_json})
        # part2: check json, handle POST request
        checked_json, response, requested_json = check_json_form(
            request, MESSAGE_BAD_JSON, MESSAGE_GET_FAV_NO_JSON)
        if checked_json != True:
            return response
        # verify room id type, with strict mode
        requested_json["user_id"] = login_session["user_id"]
        correct_format, valid_update_pairs, response = process_request_json(
            Favorite, requested_json, True, access_mode="read", nondb_type_map={"action": str})
        if correct_format == False:
            return response
        room = get_row_if_exists(
            Room, session, ** {"id": requested_json["room_id"]})
        user = get_row_if_exists(
            User, session, ** {"id": login_session["user_id"]})
        # if the room id in the request doesn't fit any entry in db, return error message
        if room is None:
            response = generate_message(MESSAGE_FAV_ROOM_NOT_EXIST, 404)
            return response
        if requested_json["action"] == "add":
            # the add favorite already handle duplicates add
            # it treats multiple adds as one add and every duplicate add afterwards is counted as success
            add_favorite(room, user, session)
            response = generate_message(MESSAGE_POST_FAV_ADD_SUCCESS, 201)
            return response
        elif requested_json["action"] == "delete":
            # the delete favorite already handle duplicates delete
            # it treats multiple delete as one delete and every duplicate delete afterwards is counted as success
            remove_entry(Favorite, requested_json["room_id"], session)
            response = generate_message(MESSAGE_POST_FAV_DEL_SUCCESS, 200)
            return response
        else:  # method not supported
            response = generate_message(
                MESSAGE_POST_FAV_METHOD_NOT_SUPPORTED, 405)
            return response

    return app


if __name__ == "__main__":
    app = create_app()
    app.secret_key = b"\xb7\xe2\xd6\xa3\xe2\xe0\x11\xd1\x92\xf1\x92G&>\xa2:"
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
