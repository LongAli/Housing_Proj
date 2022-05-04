import React, { FunctionComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import RadioToggle, { RadioToggleProps } from './RadioToggle';

export interface RadioToggleGroupProps {
  toggleProps: RadioToggleProps[];
}

const RadioToggleGroup: FunctionComponent<RadioToggleGroupProps> = ({
  toggleProps,
}) => (
  <Row className="w-100">
    {toggleProps.map((props) => (
      <Col xs={4} lg={3}>
        <RadioToggle {...props} />
      </Col>
    ))}
  </Row>
);

export default RadioToggleGroup;
