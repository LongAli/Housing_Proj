import React, { FunctionComponent, useRef } from 'react';
import { useRandomID } from '@hooks';
import { FormControlProps } from 'react-bootstrap';
import styles from './RadioButton.module.scss';

export interface RadioButtonProps extends FormControlProps {
  id?: string;
  value: string; // required for value extracting
  withLabel?: boolean; // used when we want to add text on the side
  name: string;
  checked?: boolean;
}

// radio button customizes typical html radio button and takes in same arguments
const RadioButton: FunctionComponent<RadioButtonProps> = ({
  id,
  value,
  withLabel,
  name,
  onChange,
  checked,
}) => {
  const buttonID = useRandomID(id);

  return (
    <div className="d-flex">
      <input
        type="radio"
        className={styles.radioInput}
        name={name}
        value={value}
        id={buttonID}
        onChange={onChange}
        checked={checked}
      />
      {withLabel && (
        <label htmlFor={buttonID} className="mb-0">
          <div className={styles.radioLabelBody}>{value}</div>
        </label>
      )}
    </div>
  );
};

export default RadioButton;
