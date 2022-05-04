import React, { ComponentProps } from 'react';
import Body1 from '@basics/Body1';
import { amenityIcons } from '@icons';
import cn from 'classnames';
import { StoryTemplate } from '@utils';
import styles from './Dropdown.module.scss';
import Dropdown from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const optionArray = Array.from({ length: 6 }, (_, i) => (i + 1).toString());

const Template = StoryTemplate<
  ComponentProps<typeof Dropdown>,
  typeof Dropdown
>(Dropdown);

export const Default = Template.bind({});
Default.args = {
  options: optionArray,
  className: styles.small,
};

export const DropdownWithLabel = Template.bind({});
DropdownWithLabel.args = {
  options: optionArray,
  className: styles.small,
  initialSelected: '2',
  label: 'Depression Level',
  required: true,
};

export const DropdownWithPostfix = Template.bind({});
DropdownWithPostfix.args = {
  options: optionArray,
  className: styles.small,
  initialSelected: '2',
};
DropdownWithPostfix.decorators = [
  (Story) => (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="d-flex align-items-center">
        <Story />
        <Body1 className="mx-2 mt-3">people</Body1>
      </div>
    </div>
  ),
];

export const DropdownWithIcon = Template.bind({});
DropdownWithIcon.args = {
  options: optionArray,
  className: styles.small,
  initialSelected: '2',
};
DropdownWithIcon.decorators = [
  (Story) => (
    <div className="d-flex flex-column align-items-center mt-3">
      <div
        className={cn('d-flex align-items-center', styles.dropdownSVGContainer)}
      >
        <amenityIcons.Bath className={cn('mr-2 mt-3', styles.svgFilled)} />
        <Story />
      </div>
    </div>
  ),
];
