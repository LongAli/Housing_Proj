import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import AmenityIcon from './AmenityIcon';

export default {
  title: 'AmenityIcon',
  component: AmenityIcon,
};

const Template = StoryTemplate<
  ComponentProps<typeof AmenityIcon>,
  typeof AmenityIcon
>(AmenityIcon);

export const Default = Template.bind({});

export const Amenity = Template.bind({});
Amenity.args = {
  amenity: 'Bath',
};

export const FakeAmenity = Template.bind({});
FakeAmenity.args = {
  amenity: 'Glass Floors',
};
