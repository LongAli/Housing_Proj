import React, { FunctionComponent } from 'react';
import { Icon as IconType, alertIcons } from '@icons';
import styles from './HelpText.module.scss';
import cn from 'classnames';

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
  children,
}) => {
  return (
    <div className={cn(styles[variant], styles.helpTextContainer)}>
      <div className={cn({ [styles.noPadding]: !icon }, styles.icon)}>
        {icon && <alertIcons.Alert />}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default HelpText;
