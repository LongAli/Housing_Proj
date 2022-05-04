import React, { FunctionComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import CheckBoxButton, { CheckBoxButtonProps } from './CheckBox/CheckBoxButton';

export interface CheckBoxGroupProps {
  buttonProps: CheckBoxButtonProps[];
}

const CheckBoxGroup: FunctionComponent<CheckBoxGroupProps> = ({
  buttonProps,
}) => (
  <Row className="w-100">
    {buttonProps.map((props) => (
      <Col xs={6} md={4} key={uuidv4()}>
        <CheckBoxButton {...props} />
      </Col>
    ))}
  </Row>
);

export default CheckBoxGroup;
