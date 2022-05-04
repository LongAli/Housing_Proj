import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import GooglePlaceAutoComplete from './GooglePlaceAutoComplete';

export default {
  title: 'GooglePlaceAutoComplete',
  component: GooglePlaceAutoComplete,
};

const Template = StoryTemplate<
  ComponentProps<typeof GooglePlaceAutoComplete>,
  typeof GooglePlaceAutoComplete
>(GooglePlaceAutoComplete);

export const Default = Template.bind({});
Default.args = {};
