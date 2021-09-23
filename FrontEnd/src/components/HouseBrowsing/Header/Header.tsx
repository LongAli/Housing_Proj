import React, { FunctionComponent } from 'react';
import { filterIcons } from '@icons';
import styles from './Header.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Button, Subtitle2 } from '@basics';
import { showLogin, showPost } from '@redux';
import { useUser } from '@hooks';
import { Row, Col } from 'react-bootstrap';

const Filter: FunctionComponent = () => {
  const { data: user } = useUser();
  const dispatch = useDispatch();
  return (
    <Row>
      <Col
        md={12}
        lg={9}
        className={cn('px-lg-5 px-md-4 w-100', styles.filter)}
      >
        <filterIcons.hello className="d-none d-md-flex" />
        <filterIcons.arrow className="d-none d-md-flex" />
        <h2 className={styles.homehubOrange}>Homehub</h2>
        <filterIcons.arrow className="d-none d-md-flex" />
        <filterIcons.loveHouse className="d-none d-md-flex" />
      </Col>
      <Col lg={2}>
        <div className={styles.postBulletin}>
          <div className={styles.subtitle3}>Got a place to lease?</div>
          <Button
            className={styles.postButton}
            size="secondary"
            variant="outline"
            onClick={() =>
              user.isLoggedIn ? dispatch(showPost()) : dispatch(showLogin())
            }
          >
            <Subtitle2>Post it Now</Subtitle2>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Filter;
