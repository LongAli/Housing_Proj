import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page5 from './Page5';

export default {
  title: 'Page5',
  component: Page5,
};

const Template = StoryTemplate<ComponentProps<typeof Page5>, typeof Page5>(
  Page5,
);

export const Default = Template.bind({});
