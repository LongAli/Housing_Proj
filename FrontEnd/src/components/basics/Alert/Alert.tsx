import React, { FunctionComponent } from 'react';
import { alertIcons } from '@icons';
import Button from '@components/basics/Button';
import cn from 'classnames';
import styles from './Alert.module.scss';

export type alertVariant = 'success' | 'alert' | 'warning' | 'info';

interface AlertProps {
  variant: alertVariant;
  title?: string;
  text: string;
  buttonText?: string;
  onClick?: () => any;
}

const iconMapping = {
  success: alertIcons.Check,
  alert: alertIcons.Alert,
  warning: alertIcons.Ring,
  info: alertIcons.Info,
};

const Alert: FunctionComponent<AlertProps> = ({
  variant,
  title = '',
  text,
  buttonText = '',
  children,
  onClick,
}) => {
  const Icon = iconMapping[variant];

  return (
    <div className={cn(styles[variant], styles.alertContainer)}>
      <div>
        <Icon />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.button}>
        {children}
        {buttonText === '' ? (
          <alertIcons.X />
        ) : (
          <Button
            variant="wrapper"
            size="secondary"
            className={styles[variant]}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Alert;
