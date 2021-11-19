import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page6 from './Page6';

export default {
  title: 'Page6',
  component: Page6,
};

const Template = StoryTemplate<ComponentProps<typeof Page6>, typeof Page6>(
  Page6,
);

export const Default = Template.bind({});
