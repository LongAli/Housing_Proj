import { SlideShow, Subtitle1 } from '@basics';
import { useLandlordRoomData, useStudentRoomData } from '@hooks';
import { miscIcons } from '@icons';
import { LandlordHousePost, StudentHousePostConsume } from '@models';
import { formatAvail, formatHouseCardRent, formatUrlsWithAws } from '@utils';
import React, { FunctionComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from './HouseCard.module.scss';

interface Props {
  roomId: number;
}

interface RightTxtColumnProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  distance: string;
  address: string;
  roomType: string;
  availability: string;
  rent: string;
}

const RightTxtColumn: FunctionComponent<RightTxtColumnProps> = ({
  onClick,
  distance,
  address,
  roomType,
  availability,
  rent,
}) => (
  <Col md={5} className={styles.secondCol} onClick={onClick}>
    <div className={styles.textPortion}>
      <div className={styles.day}>
        <miscIcons.RoundArrow /> 1 day ago
      </div>

      <Subtitle1 className={styles.price}>{rent}+ /mo</Subtitle1>

      <div className={styles.distance}>
        <miscIcons.busIcon /> <b>~ {distance} to Price Center </b>
      </div>

      <div className={styles.address}>
        <div className={styles.locationIcon}>
          <miscIcons.LocationIcon />
        </div>
        <div className={styles.addressText}>{address}</div>
      </div>

      <div className={styles.room}>{roomType}</div>

      <div className={styles.date}>Available {availability}</div>
    </div>
  </Col>
);

export const HouseCardLandLord: FunctionComponent<Props> = ({ roomId }) => {
  const { data, error } = useLandlordRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const routeToHouseProfile = (id: number) => {
    window.open(`/housing/landLordPost/${id}`, '_blank');
  };

  const {
    name,
    address,
    distance,
    rent,
    roomType,
    availability,
    images,
  } = data as LandlordHousePost;

  const formattedRent = formatHouseCardRent(rent);
  const slideShowItems = images?.map((url) => ({
    src: url,
    alt: `${name} , ${address}}`,
  }));

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0">
        <Container className={styles.container}>
          <Row>
            <Col md={7} className={styles.pic}>
              <SlideShow
                images={slideShowItems}
                onImageClick={() => routeToHouseProfile(roomId)}
              />
            </Col>
            <RightTxtColumn
              onClick={() => routeToHouseProfile(roomId)}
              {...{
                address,
                distance,
                roomType,
                availability,
                rent: formattedRent,
              }}
            />
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export const HouseCardStudent: FunctionComponent<Props> = ({ roomId }) => {
  const { data, error } = useStudentRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const routeToHouseProfile = (id: number) => {
    window.open(`/housing/studentPost/${id}`, '_blank');
  };

  const {
    placeName,
    address,
    distance,
    rent,
    roomType,
    availMonth,
    availYear,
    untilMonth,
    untilYear,
    photos,
  } = data as StudentHousePostConsume;
  const availability = formatAvail(
    availMonth,
    availYear,
    untilMonth,
    untilYear,
  );
  const prefixedPhotos = formatUrlsWithAws(photos);
  const slideShowItems = prefixedPhotos?.map((url) => ({
    src: url,
    alt: `${placeName} , ${address}}`,
  }));

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0">
        <Container className={styles.container}>
          <Row>
            <Col md={7} className={styles.pic}>
              <SlideShow
                images={slideShowItems}
                onImageClick={() => routeToHouseProfile(roomId)}
              />
            </Col>
            <RightTxtColumn
              onClick={() => routeToHouseProfile(roomId)}
              {...{
                address,
                distance,
                roomType,
                availability,
                rent,
              }}
            />
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
