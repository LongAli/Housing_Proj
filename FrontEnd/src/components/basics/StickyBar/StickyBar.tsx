import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './StickyBar.module.scss';

const StickyBar: FunctionComponent = ({ children }) => (
  <Row className={styles.wrapperRow}>
    <Col md={{ offset: 1, span: 10 }} className={styles.bar}>
      {children}
    </Col>
  </Row>
);

export default StickyBar;
