import React, { useState, FunctionComponent } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';
import cn from 'classnames';
import { Icon as IconType, miscIcons } from '@icons';
import styles from './InputLine.module.scss';
import RequiredAsterisk from '../RequiredAsterisk';

export interface InputLineProps
  extends FormControlProps,
    // Omits the default onChange method from the React HTML element that this extends.
    Omit<
      React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'onChange'
    > {
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue;
  errorClassName?: string;
  inlinePostText?: string;
  postTextClassName?: string;
  required?: boolean;
  rows?: number;
  icon?: IconType;
}

const InputLine: FunctionComponent<InputLineProps> = ({
  label,
  labelClassName,
  error,
  errorClassName,
  inlinePostText,
  postTextClassName,
  required,
  className,
  readOnly,
  onChange,
  isInvalid,
  isValid,
  value,
  children,
  icon,
  ...formControlProps
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(!value || value === '');
  const Icon = icon?.icon;
  return (
    <div className={styles.root}>
      <Form.Group>
        {(label || required) && (
          <Form.Label className={cn(styles.label, labelClassName)}>
            {label}
            {' '}
            {required && <RequiredAsterisk />}
          </Form.Label>
        )}

        <div className={cn('d-flex', styles.inputRow)}>
          <Form.Control
            {...formControlProps}
            value={value}
            className={cn(className, {
              [styles.unfilled]: isEmpty && !readOnly,
              [styles.filled]: !isEmpty || readOnly,
              [styles.readOnly]: readOnly,
              [styles.invalid]: (isInvalid || error) && !readOnly,
              [styles.isValid]: isValid,
              'pl-3': !icon,
            })}
            isValid={!readOnly && isValid}
            readOnly={readOnly}
            onChange={(e) => {
              setIsEmpty(!e.target.value || e.target.value === '');
              if (onChange) onChange(e);
            }}
          />
          {icon && (
            <div className={styles.inputIcon}>
              <Icon />
            </div>
          )}
          {(isInvalid || error) && (
            <miscIcons.alert className={styles.inputStatus} />
          )}
          {isValid && <miscIcons.valid className={styles.inputStatus} />}
          {inlinePostText && (
            <div className={cn(styles.inlineText, postTextClassName)}>
              {inlinePostText}
            </div>
          )}
        </div>

        {children}

        {error && (
          <Form.Label className={cn(styles.error, errorClassName)}>
            {error}
          </Form.Label>
        )}
      </Form.Group>
    </div>
  );
};

export default InputLine;
