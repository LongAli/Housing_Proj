from app.db.database_setup import User, Room, Move_In,\
    House_Attribute, Attribute, Favorite, Address, Stay_Period, Base
from app.util.aws.s3 import get_images, upload_file_wobject
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
import os

# delete these
from app.util.util import verify_image
from PIL import Image
import io

HOUSEIT_S3_URL = "https://houseit.s3.us-east-2.amazonaws.com/"

# Helper fns


def getSession(db_path):
    """
    get a given db session
    """
    engine = create_engine(db_path)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    return session


def add_and_commit(db_row, session):
    session.add(db_row)
    session.commit()

# Create


def add_user(name, email, date_created, phone, description, school_year, major,
             session):
    """
    add a row to the User table
    """
    User_to_add = User(name=name, email=email, date_created=date_created,
                       phone=phone, description=description,
                       school_year=school_year,
                       major=major)
    add_and_commit(User_to_add, session)
    return User_to_add


def add_address(distance, address, place_name, session):
    """
    add a row to the Address table
    """
    address_to_add = Address(
        address=address, distance=distance, place_name=place_name)
    add_and_commit(address_to_add, session)
    return address_to_add


def add_room(date_created, room_type,
             rent, negotiable,
             place_description, stay_period,
             address, user,
             move_in, num_bed,
             num_bath, utility,
             looking_for_count, session):
    """
    add a row to the Room table
    """
    Room_to_add = Room(date_created=date_created,
                       room_type=room_type,
                       rent=rent,
                       negotiable=negotiable,
                       place_description=place_description,
                       stay_period=stay_period,
                       address=address,
                       user=user,
                       move_in=move_in,
                       num_bed=num_bed,
                       num_bath=num_bath,
                       utility=utility,
                       looking_for_count=looking_for_count,
                       )
    add_and_commit(Room_to_add, session)
    return Room_to_add


def add_move_in(start_date, end_date, session):
    """
    add a row to the Move_In table
    """
    Move_In_to_add = Move_In(start_date=start_date,
                             end_date=end_date)
    add_and_commit(Move_In_to_add, session)
    return Move_In_to_add


def add_stay_period(avail_time, until_time, session):
    """
    add a row to the Stay_Period table
    """
    Stay_Period_to_add = Stay_Period(avail_time=avail_time,
                                     until_time=until_time)
    add_and_commit(Stay_Period_to_add, session)
    return Stay_Period_to_add


def add_house_attribute(room, house_attribute, session):
    """
    link attribute to an associated room_id if
    the link isn"t already present
    links are recorded in the House_Attribute table
    attributes are recorded in the Attribute table
    """
    house_attribute_to_add = get_row_if_exists(
        House_Attribute, session, ** {"room_id": room.id,
                                      "attribute_name": house_attribute.name})
    if not house_attribute_to_add:
        house_attribute_to_add = House_Attribute(
            room=room, house_attribute=house_attribute)
        add_and_commit(house_attribute_to_add, session)
    return house_attribute_to_add


def add_attribute(name, category, session):
    """
    add an attribute to the Attribute table
    if it doesn"t already exist there
    """
    attribute_to_add = get_row_if_exists(Attribute, session, **
                                         {"name": name, "category": category})
    if not attribute_to_add:
        attribute_to_add = Attribute(name=name, category=category)
        add_and_commit(attribute_to_add, session)
    return attribute_to_add


def add_favorite(room, user, session):
    """
    associate favorite room with user in Favorite table
    if the association doesn"t already exist
    """
    favorite_to_add = get_row_if_exists(Favorite, session, **
                                        {"room_id": room.id, "user_id": user.id})
    if not favorite_to_add:
        favorite_to_add = Favorite(room=room, user=user)
        add_and_commit(favorite_to_add, session)
    return favorite_to_add

# Read


def get_row_if_exists(db_obj, session, **condition):
    """
    Check if a row that satisfies a certain condition exists
    :param db_obj: Database Object like User
    :param session: a db connection session
    :param condition: kwargs like dict like {"name":"Cris"}
    :return: the row if a row exists, else None
    """
    row = session.query(db_obj).filter_by(**condition).first()
    return row


def get_insert_id(base, session):
    """
    Get the id of to-be-inserted entry
    """
    last_row = session.query(base).order_by(base.id.desc()).first()
    new_room_id = 1 + (last_row.id if last_row else 0)
    return new_room_id


def read_all(base, session):
    """
    get all entries from a table
    """
    return session.query(base).all()


def read_criteria(base, condition_dict, session, mode="s"):
    """
    get entries from db that fits a criteria

    mode supports single("s") and multiple("m")
    """
    try:
        # single entry mode
        if mode == "s":
            # one method would throw error if no result found or multiple results found
            # if assumes only one fits the criteria
            return session.query(base).filter_by(**condition_dict).one()
        elif mode == "m":
            return session.query(base).filter_by(**condition_dict).all()
    except (NoResultFound, MultipleResultsFound):
        return None


def room_json(room, session, offline_test_mode=False, login_session=None):
    """
    generates a JSON representation of a given room
    in the Room table, also including its attributes
    (House_Attribute), preferred move-in time (Move_In),
    and the user to post the room (User)

    offline_test_mode is used to separate online logic from offline logic since online method is tested separately
    in this method, test mode would disable fetching images from s3 bucket
    """
    other_map = {"genders": [], "amenities": [],
                 "habits": [], "room_capacities": []}
    house_attrs = session.query(House_Attribute).filter(
        House_Attribute.room_id == room.id).all()
    house_move_in = session.query(Move_In).filter(
        Move_In.id == room.move_in_id).first()
    house_user = session.query(User).filter(
        User.id == room.user_id).first()
    for ha in house_attrs:
        category_name = session.query(Attribute).filter(
            Attribute.name == ha.attribute_name).first().category
        other_map[category_name].append(ha.attribute_name)
    r_json = room.serialize

    if offline_test_mode == True:
        room_photos = ["photo1", "photo2"]
        profile_photo = "profile_photo"
    else:
        room_photos = get_images("user"
                                 + str(house_user.id),
                                 extra_path=str(room.id)+"/")
        profile_photo = HOUSEIT_S3_URL + \
            get_images("user"+str(house_user.id), category="profile")[0]

    # if not in test mode, provide sensitive info only when user logs in
    user_email = house_user.email
    user_phone = house_user.phone
    # if it is used in the flask
    if login_session is not None:
        try:
            login_session["user_id"]
        except KeyError:
            user_phone = user_email = ""

    return_json = {
        "photos": room_photos,
        "address": room.address.serialize["address"],
        "distance": room.address.serialize["distance"],
        "placeName": room.address.serialize["place_name"],
        "rent": str(r_json["rent"]),
        "numBed": str(r_json["num_bed"]),
        "numBath": str(int(r_json["num_bath"])),
        "utility": str(r_json["utility"]) if r_json["utility"] > 0 else "",
        "roomType": r_json["room_type"],
        "roomCapacities": other_map["room_capacities"],
        "lookingForCount": str(r_json["looking_for_count"]) if r_json["looking_for_count"] > 0 else "",
        "availMonth": room.stay_period.avail_time.strftime("%B"),
        "availYear": room.stay_period.avail_time.strftime("%Y"),
        "untilMonth": room.stay_period.until_time.strftime("%B"),
        "untilYear": room.stay_period.until_time.strftime("%Y"),
        "amenities": other_map["amenities"],
        "startDate": house_move_in.start_date.strftime("%b/%d/%y") if house_move_in.start_date else "",
        "endDate": house_move_in.end_date.strftime("%b/%d/%y") if house_move_in.end_date else "",
        "genders": other_map["genders"],
        "habits": other_map["habits"],
        "placeDescription": r_json["place_description"],
        "userName": house_user.name,
        "major": house_user.major,
        "schoolYear": house_user.school_year,
        "userBio": house_user.description,
        "userEmail": user_email,
        "userPhone": user_phone,
        "userPhoto": profile_photo,
        "roomId": r_json["id"],  # not supported for current version
        # not supported for current version
        "negotiable": r_json["negotiable"],
    }
    return return_json


# Update

def update_field(db_obj, session, condition={}, values={}):
    """
    Updates rows in given db matching condition, using given values.
    condition and values should be dictionaries.
    NOTE: invalid conditions or values WILL throw errors!
    """
    updated_obj = session.query(db_obj).filter_by(**condition).update(values)
    session.commit()
    return updated_obj

# write an attribute to database


def write_attribute(attributes, category, room, session):
    """
    Posted when user posts a room. 
    Writes list of preferences and facilities of room to the Attribute table.
    Assumes only legal attributes will be added.
    """
    for attribute in attributes:
        # check if an attribute exists
        new_attribute = get_row_if_exists(
            Attribute, session, **{"name": attribute})
        if not new_attribute:
            new_attribute = add_attribute(attribute, category, session)
        # finally add the house attribute
        add_house_attribute(room, new_attribute, session)

# write a single room to database


def write_room(room_json, user_id, session, offline_test_mode=False, test_mode=False):
    """
    write a new room to the db with the json 

    Assume the function would only be called when all entries in room_json are valid, user_id exists.
    offline_test_mode is used to separate online logic from offline logic since online method is tested separately
    """
    # gets room owner, assuming when a new room gets added the user exists
    room_owner = get_row_if_exists(
        User, session, **{"id": user_id})
    new_room_id = get_insert_id(Room, session)
    # upload photos first since if we fails to upload images, we shouldn't add entry to the db
    upload_status = False
    if offline_test_mode == False:
        for index, photo in enumerate(room_json["photos"]):
            user_prefix = "test_user" if test_mode else "user"
            _, file_extension = os.path.splitext(photo.filename)
            # standardize file name by index
            path_name = "/".join([user_prefix+str(room_owner.id), "housing",
                                  str(new_room_id), str(index)+file_extension])
            upload_status = upload_file_wobject(photo, "houseit", path_name)
    else:
        upload_status = True

    if upload_status == False:
        return upload_status

    new_move_in = get_row_if_exists(Move_In, session, **{
        "start_date": room_json["start_date"],
        "end_date": room_json["end_date"]
    })

    if not new_move_in:
        new_move_in = add_move_in(room_json["start_date"],
                                  room_json["end_date"], session)

    new_address = add_address(room_json["distance"],
                              room_json["address"],
                              room_json["place_name"],
                              session)

    new_stay_period = add_stay_period(
        room_json["avail_time_dt"], room_json["until_time_dt"], session)

    new_room = add_room(datetime.now(),
                        room_json["room_type"],
                        room_json["rent"],
                        room_json["negotiable"],
                        room_json["place_description"],
                        new_stay_period,
                        new_address,
                        room_owner,
                        new_move_in,
                        room_json["num_bed"],
                        room_json["num_bath"],
                        room_json["utility"],
                        room_json["looking_for_count"],
                        session)
    write_attribute(room_json["room_capacities"],
                    "room_capacities", new_room, session)
    write_attribute(room_json["genders"], "genders", new_room, session)
    write_attribute(room_json["habits"], "habits", new_room, session)
    write_attribute(room_json["amenities"], "amenities", new_room, session)
    return upload_status

# DELETE


def remove_entry(base, entry_id, session):
    """
    removes an entry from a db with its unique id

    return number of deleted rows
    """
    deleted_rows = session.query(base).filter_by(id=entry_id).delete()
    session.commit()
    return deleted_rows


def remove_all(base, session):
    """
    removes all rows from a db

    return number of deleted rows
    """
    deleted_rows = session.query(base).delete()
    session.commit()
    return deleted_rows
