import Button from '@basics/Button';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import BootstrapDropdown, * as BootstrapDropdownMetadata from 'react-bootstrap/Dropdown';
import styles from './ImageDropdown.module.scss';

// TODO expand this
export interface itemConfig {
  label: string;
  href?: string;
  labelClassName?: string;
  onClick?: () => void;
  selected?: boolean;
}

interface ImageDropdownProps extends BootstrapDropdownMetadata.DropdownProps {
  items: itemConfig[];
  profileIcon: string;
}

const ImageDropdown: FunctionComponent<ImageDropdownProps> = ({
  items,
  className,
  profileIcon,
}) => (
  <BootstrapDropdown className={cn(className, styles.dropdown)}>
    <BootstrapDropdown.Toggle
      as={Button}
      className={styles.profileToggle}
      variant="wrapper"
    >
      <img className={styles.profileImage} src={profileIcon} />
    </BootstrapDropdown.Toggle>
    {/* TODO might need to make the menu a basic  component itself */}
    <BootstrapDropdown.Menu className={styles.dropdownMenu} align="right">
      {items.map(({
        href, label, labelClassName, onClick, selected,
      }) => (
        <BootstrapDropdown.Item
          href={href}
          className={styles.dropdownItem}
          onClick={onClick}
        >
          <h5
            className={cn(labelClassName, 'text-center', {
              [styles.isSelected]: selected,
            })}
          >
            {label}
          </h5>
        </BootstrapDropdown.Item>
      ))}
    </BootstrapDropdown.Menu>
  </BootstrapDropdown>
);

export default ImageDropdown;
