import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import cn from 'classnames';
import styles from './Caption.module.scss';

export type CaptionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Caption: FunctionComponent<CaptionProps> = ({ className, ...props }) => (
  <div className={cn(className, styles.caption)} {...props} />
);

export default Caption;
