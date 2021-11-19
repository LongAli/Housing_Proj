import { useLandlordRoomIds, useStudentRoomIds } from '@hooks';
import { loading } from '@icons';
import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { HouseCardLandLord, HouseCardStudent } from './HouseCard';
import styles from './HouseCardList.module.scss';

export type PostingType = 'landlord' | 'student';

interface HouseCardListUIProps {
  roomIds: number[];
  postType: PostingType;
}

const HouseCardListUI: FunctionComponent<HouseCardListUIProps> = ({
  roomIds,
  postType,
}) => {
  const HouseCard =
    postType === 'student' ? HouseCardStudent : HouseCardLandLord;
  return (
    <Container fluid className="px-md-0">
      <Row className={styles.cardRow}>
        {roomIds.map((roomId) => (
          <Col xs={12} lg={6} className="mb-5">
            <HouseCard roomId={roomId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const BrowsingLandlordList: FunctionComponent = () => {
  const { data: roomIds, error } = useLandlordRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} postType="landlord" />;
};

export const BrowsingStudentList: FunctionComponent = () => {
  const { data: roomIds, error } = useStudentRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} postType="student" />;
};

const BrowsingList: FunctionComponent<{ postType: PostingType }> = ({
  postType,
}) => {
  return (
    <>
      {postType === 'student' ? (
        <BrowsingStudentList />
      ) : (
        <BrowsingLandlordList />
      )}
    </>
  );
};

export default BrowsingList;
