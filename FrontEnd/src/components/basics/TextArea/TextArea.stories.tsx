import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import TextArea from './TextArea';

export default {
  title: 'TextArea',
  component: TextArea,
};

const Template = StoryTemplate<
  ComponentProps<typeof TextArea>,
  typeof TextArea
>(TextArea);

export const DefaultWithPlaceHolder = Template.bind({});
DefaultWithPlaceHolder.args = {
  maxLength: 20,
  label: 'Jurassic Park is Better than Jurassic World',
  controlId: 'thesis',
  defaultContent: '',
  placeHolder: 'This is a placeholder',
  readOnly: false,
};

export const Default = Template.bind({});
Default.args = {
  maxLength: 80,
  label: 'Jurassic Park is Better than Jurassic World',
  controlId: 'thesis',
  defaultContent: 'No need to explain',
  readOnly: false,
};
