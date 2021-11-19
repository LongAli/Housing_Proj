import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page3 from './Page3';

export default {
  title: 'Page3',
  component: Page3,
};

const Template = StoryTemplate<ComponentProps<typeof Page3>, typeof Page3>(
  Page3,
);

export const Default = Template.bind({});
