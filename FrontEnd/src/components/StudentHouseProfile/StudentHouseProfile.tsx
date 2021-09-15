import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';
import HelpText from '@basics/HelpText';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import LookingFor from './LookingFor/LookingFor';
import NameCard from './NameCard/NameCard';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import ProfileSlideShow from './ProfileSlideShow/ProfileSlideShow';
import useBreakpoints from 'use-window-width-breakpoints';
import { useUser } from '@hooks';
import { StudentHousePost, StudentHousePostConsume } from '@models';
import { formatUrlsWithAws } from '@utils';

const isPhotosString = (photos: File[] | string[]): photos is string[] => {
  for (var i = 0; i < photos.length; i++) {
    if (typeof photos[i] !== 'string') return false;
  }
  return true;
};

const StudentHousingProfile: FunctionComponent<
  StudentHousePost | StudentHousePostConsume
> = ({
  photos: photoUrls,
  placeName,
  address,
  distance,
  rent,
  numBath,
  numBed,
  utility,
  roomType,
  roomCapacities,
  lookingForCount,
  amenities,
  availMonth,
  availYear,
  untilMonth,
  untilYear,
  startDate,
  endDate,
  genders,
  habits,
  placeDescription,
  userEmail,
  userPhone,
  userPhoto,
  userName,
  major,
  schoolYear,
  userBio,
  isPreview,
}) => {
  const { data: user } = useUser();
  const breakpoint = useBreakpoints();
  if (isPhotosString(photoUrls)) {
    // they are strings from backend, then format them
    photoUrls = formatUrlsWithAws(photoUrls);
  } else {
    // if not an array of strings, convert files to url strings
    photoUrls = photoUrls.map((photoFile) => URL.createObjectURL(photoFile));
  }

  const slideShowItems = (photoUrls as string[]).map((url) => ({
    src: url,
    alt: `${placeName} , ${address}}`,
  }));
  const profileSlideShow = <ProfileSlideShow photos={slideShowItems} />;
  const placeDetails = (
    <PlaceDetails
      {...{
        rent,
        numBed,
        numBath,
        utility,
        roomType,
        roomCapacities,
        lookingForCount,
        amenities,
        availMonth,
        availYear,
        untilMonth,
        untilYear,
        startDate,
        endDate,
      }}
    />
  );
  const lookingFor = <LookingFor {...{ genders, habits, placeDescription }} />;
  const generalInfo = <GeneralInfo {...{ address, distance, placeName }} />;
  const nameCard = (
    <NameCard
      {...{
        userEmail,
        userPhone,
        userPhoto,
        userName,
        major,
        schoolYear,
        userBio,
        isLoggedIn: user.isLoggedIn,
      }}
    />
  );
  const messagePreview = (
    <HelpText
      variant="red"
      text="If you wish to change the content here, please finish this post and navigate to Profile at the top right."
      icon={true}
    />
  );

  return (
    <>
      {breakpoint.up.lg ? (
        <>
          <Col xs={{ offset: 1, span: 5 }}>
            {profileSlideShow}
            {placeDetails}
            {lookingFor}
          </Col>
          <Col className="pl-4" xs={5}>
            {generalInfo}
            {nameCard}
            {isPreview && messagePreview}
          </Col>
        </>
      ) : (
        <>
          <Col xs={12}>{profileSlideShow}</Col>
          <Col xs={12} className="mt-3">
            {generalInfo}
          </Col>
          <Col xs={12} className="mt-3">
            {nameCard}
            {isPreview && messagePreview}
          </Col>
          <Col xs={12} className="mt-3">
            {placeDetails}
          </Col>
          <Col xs={12} className="mt-3">
            {lookingFor}
          </Col>
        </>
      )}
    </>
  );
};

export default StudentHousingProfile;
