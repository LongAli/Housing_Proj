import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { Icon as IconType, IconProps } from '@icons';
import styles from './Button.module.scss';

/**
 * The size of the button. Primary = bigger, Secondary = smaller.
 */
export type ButtonSize = 'primary' | 'secondary';

/**
 * The type of the button. The wrapper type should be used for icons/images/etc; it has no
 * padding/margin and has a transparent background. To make something "inactive", use the
 * `disabled` prop.
 */
export type ButtonVariant = 'solid' | 'outline' | 'wrapper';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: { icon: IconType; config?: IconProps };
}

/**
 * Button component. size is 'primary' by default and variant is 'solid' by default.
 * Can optionally provide an icon, which will be prepended to the children of the
 * button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  size = 'primary',
  variant = 'solid',
  children,
  icon,
  className = '',
  ...buttonProps
}) => {
  // Configure icon
  const Icon = icon?.icon; // React components that are rendered with JSX must be capitalized
  const iconConfig = icon?.config || {};
  const iconSize = `${size}Icon`;
  const styledIcon = Icon && (
    <div className={cn(styles.icon, styles[iconSize])}>
      <Icon {...iconConfig} />
    </div>
  );

  // TODO const Typography = () => size === 'primary' ?

  // Configure children (will only be used if icon exists)
  const styledChildren = children && (
    <span className={styles.children}>{children}</span>
  );

  const content = icon ? (
    <div className={styles.contentWithIcon}>
      {styledIcon}
      {styledChildren}
    </div>
  ) : (
    children
  );

  return (
    <button
      type="button"
      className={cn(styles.button, styles[size], styles[variant], className)}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

export default Button;
