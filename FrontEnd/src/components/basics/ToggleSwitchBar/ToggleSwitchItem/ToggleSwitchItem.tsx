import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './ToggleSwitchItem.module.scss';

interface ToggleSwitchItemProps {
  isActive: boolean;
  onSwitch: () => any;
}

const ToggleSwitchItem: FunctionComponent<ToggleSwitchItemProps> = ({
  isActive,
  onSwitch,
  children,
}) => (
  <div
    className={cn(styles[isActive ? 'active' : 'inactive'], styles.switchItem)}
    onClick={isActive ? undefined : onSwitch}
  >
    {children}
  </div>
);

export default ToggleSwitchItem;
