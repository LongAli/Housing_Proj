import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { ErrorBox } from '@basics';
import * as z from 'zod';
import cn from 'classnames';
import styles from './RadioGroup.module.scss';
import RadioButton, { RadioButtonProps } from './RadioButton';

export interface RadioGroupProps {
  buttonProps: RadioButtonProps[];
  wrapperClass?: string;
  className?: string;
  error?: string | z.ZodIssue;
  isInvalid?: boolean;
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  buttonProps,
  error,
  isInvalid,
  wrapperClass = 'mr-3',
  className = 'w-100',
}) => (
  <Row className={cn(className, styles.wrapperRow)}>
    {(isInvalid || error) && <ErrorBox />}
    {buttonProps.map((props) => (
      <div
        key={props.value}
        className={cn(wrapperClass, styles.buttonGroupChild)}
      >
        <RadioButton {...props} />
      </div>
    ))}
  </Row>
);

export default RadioGroup;
