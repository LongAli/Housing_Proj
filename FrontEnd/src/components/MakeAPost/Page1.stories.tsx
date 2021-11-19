import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page1 from './Page1';

export default {
  title: 'Page1',
  component: Page1,
};

const Template = StoryTemplate<ComponentProps<typeof Page1>, typeof Page1>(
  Page1,
);

export const Default = Template.bind({});
