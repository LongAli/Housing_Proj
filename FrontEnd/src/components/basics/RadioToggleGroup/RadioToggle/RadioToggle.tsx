import React, { FunctionComponent } from 'react';
import { Body1 } from '@basics';
import { useRandomID } from '@hooks';
import styles from './RadioToggle.module.scss';

export interface RadioToggleProps {
  id?: string;
  value: string; // required for value extracting
  withLabel?: boolean; // used when we want to add text on the side
  name: string;
  // TODO add onChange here when actually coding the wizard form
}

const RadioToggle: FunctionComponent<RadioToggleProps> = ({
  id,
  value,
  name,
  withLabel,
}) => {
  const buttonID = useRandomID(id);
  return (
    <div className="d-flex">
      <label className={styles.switch}>
        <input type="checkbox" value={value} name={name} id={buttonID} />
        <span className={styles.slider} />
      </label>
      {withLabel && (
        <label htmlFor={buttonID}>
          <Body1 className={styles.radioLabelBody}>{value}</Body1>
        </label>
      )}
    </div>
  );
};

export default RadioToggle;
