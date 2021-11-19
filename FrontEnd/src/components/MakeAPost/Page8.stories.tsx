import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page8 from './Page8';

export default {
  title: 'Page8',
  component: Page8,
};

const Template = StoryTemplate<ComponentProps<typeof Page8>, typeof Page8>(
  Page8,
);

export const Default = Template.bind({});
