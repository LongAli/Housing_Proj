import { Body2, Caption } from '@basics';
import { miscIcons } from '@icons';
import MaterialUITooltip, {
  TooltipProps as MaterialUITooltipProps,
} from '@material-ui/core/Tooltip';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import { Optional } from 'utility-types';
import styles from './Tooltip.module.scss';

export interface TooltipProps
  extends Optional<MaterialUITooltipProps, 'children'> {
  hideInfoIcon?: boolean; // hides the info icon
  isSingleLine: boolean;
  title: string | React.ReactFragment;
}

export interface PopperWrapperProps {
  isSingleLine: boolean;
}

/**
 * The Info Icon with styling.
 */
const InfoIcon: FunctionComponent = () => (
  <div className={styles.infoIcon}>
    <miscIcons.infoCircle />
  </div>
);

/**
 * Wrapper for the actual popup component to provide the correct styling.
 */
const PopperWrapper: FunctionComponent<PopperWrapperProps> = ({
  isSingleLine,
  children,
}) => (
  <div
    className={cn(styles.tooltip, {
      [styles.tooltipSingleLine]: isSingleLine,
    })}
  >
    <Body2 className={styles.tooltipText}>{children}</Body2>
  </div>
);

/**
 * Tooltip. `title` is what will appear in the popup. `children` is what the popup will
 * listen to for hovering.
 */
const Tooltip: FunctionComponent<TooltipProps> = ({
  hideInfoIcon,
  children = '',
  title = '',
  isSingleLine,
  className,
  ...props
}) => (
  <MaterialUITooltip
    title={<PopperWrapper isSingleLine={isSingleLine}>{title}</PopperWrapper>}
    classes={{
      tooltip: styles.MUITooltip,
    }}
    {...props}
  >
    <div className={cn(styles.wrapper, className)}>
      {!hideInfoIcon && <InfoIcon />}
      <Caption className={styles.childrenWrapper}>{children}</Caption>
    </div>
  </MaterialUITooltip>
);

export default Tooltip;
