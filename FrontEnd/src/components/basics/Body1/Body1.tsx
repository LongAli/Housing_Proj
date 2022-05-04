import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import cn from 'classnames';
import styles from './Body1.module.scss';

export type Body1Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Body1: FunctionComponent<Body1Props> = ({ className, ...props }) => (
  <div className={cn(className, styles.body1)} {...props} />
);

export default Body1;
