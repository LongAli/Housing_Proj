import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Amenities from './Amenities';

export default {
  title: 'Amenities',
  component: Amenities,
};

const Template = StoryTemplate<
  ComponentProps<typeof Amenities>,
  typeof Amenities
>(Amenities);

export const Default = Template.bind({});

export const BathAmenity = Template.bind({});
BathAmenity.args = {
  selected: ['Bath'],
  useCol: true,
};

export const TwoAmenities = Template.bind({});
TwoAmenities.args = {
  selected: ['Balcony / Patio', 'Dog Friendly'],
  useCol: true,
};

export const MixedTypes = Template.bind({});
MixedTypes.args = {
  selected: ['On-site Movie Theater', 'Glass Ceilings'],
  useCol: true,
};
