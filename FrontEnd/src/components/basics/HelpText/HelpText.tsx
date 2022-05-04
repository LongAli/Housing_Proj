import React, { FunctionComponent } from 'react';
import { alertIcons } from '@icons';
import cn from 'classnames';
import styles from './HelpText.module.scss';

export type HelptextVariant = 'default' | 'red';

interface HelpTextProps {
  variant: HelptextVariant;
  text: string;
  icon: boolean;
}

const HelpText: FunctionComponent<HelpTextProps> = ({
  variant,
  text,
  icon,
}) => (
  <div className={cn(styles[variant], styles.helpTextContainer)}>
    <div className={cn({ [styles.noPadding]: !icon }, styles.icon)}>
      {icon && <alertIcons.Alert />}
    </div>
    <div className={styles.content}>
      <div className={styles.text}>{text}</div>
    </div>
  </div>
);

export default HelpText;
