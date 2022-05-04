import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import cn from 'classnames';
import styles from './Subtitle2.module.scss';

export type Subtitle2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Subtitle2: FunctionComponent<Subtitle2Props> = ({
  className,
  ...props
}) => <div className={cn(className, styles.subtitle2)} {...props} />;

export default Subtitle2;
