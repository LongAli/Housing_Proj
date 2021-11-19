import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page4 from './Page4';

export default {
  title: 'Page4',
  component: Page4,
};

const Template = StoryTemplate<ComponentProps<typeof Page4>, typeof Page4>(
  Page4,
);

export const Default = Template.bind({});
