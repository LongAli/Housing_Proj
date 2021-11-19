import React, { FunctionComponent } from 'react';
import { SectionTitle, Body2, Amenities, Amenity, Subtitle2 } from '@basics';
import { Col, Row } from 'react-bootstrap';
import { formatAvail } from '@utils';
import styles from './PlaceDetails.module.scss';

interface PlaceDetailsProps {
  rent: string;
  numBed: string;
  numBath: string;
  startDate: string;
  endDate: string;
  availMonth: string;
  availYear: string;
  untilMonth: string;
  untilYear: string;
  utility?: string;
  roomType: string;
  lookingForCount: string;
  amenities: Amenity[];
  roomCapacities: string[];
}

const PlaceDetails: FunctionComponent<PlaceDetailsProps> = ({
  rent,
  numBed,
  numBath,
  utility,
  roomType,
  lookingForCount,
  startDate,
  endDate,
  amenities,
  availMonth,
  availYear,
  untilMonth,
  untilYear,
  roomCapacities,
}) => (
  <div className={styles.wrapper}>
    <SectionTitle>About the Place</SectionTitle>
    <Row className={styles.orangeBox}>
      <Col md={6} className={styles.priceWrapper}>
        <div className={styles.rent}>Rent: ${rent}/month</div>
        {utility && (
          <div className={styles.utility}>Utility: ${utility}/month</div>
        )}
      </Col>
      <Col md={6} className={styles.roomType}>
        <div>
          {numBed} Bed | {numBath} Bath
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-3 mt-md-0">
        <div className={styles.subtitle3}>Room capacity</div>
        <Body2>{roomCapacities.join(' or ')}</Body2>
      </Col>
      <Col md={6} className="mt-3 mt-md-0">
        <div className={styles.subtitle3}>Room type</div>
        <Body2>{roomType}</Body2>
      </Col>
    </Row>
    <Row>
      <Col className="mt-3 mt-md-0">
        {lookingForCount && (
          <>
            <div className={styles.subtitle3}># People to fill</div>
            <Body2>
              {lookingForCount +
                (lookingForCount === '1' ? ' person' : ' people')}
            </Body2>
          </>
        )}
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-3 mt-md-0">
        <div className={styles.subtitle3}>Stay period</div>
        <Body2>
          {formatAvail(availMonth, availYear, untilMonth, untilYear)}
        </Body2>
      </Col>
      <Col md={6} className="mt-3 mt-md-0">
        <div className={styles.subtitle3}>Preferred move-in time</div>
        <Body2>
          {startDate && endDate ? `${startDate} - ${endDate}` : 'N/A'}
        </Body2>
      </Col>
    </Row>
    <div className="mt-3">
      <Subtitle2>Amenities</Subtitle2>
      <Amenities
        selected={amenities}
        sm={4}
        className={styles.amenities}
        colClassName={styles.amenity}
        useCol
      />
    </div>
  </div>
);

export default PlaceDetails;
