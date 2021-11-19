import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page2 from './Page2';

export default {
  title: 'Page2',
  component: Page2,
};

const Template = StoryTemplate<ComponentProps<typeof Page2>, typeof Page2>(
  Page2,
);

export const Default = Template.bind({});
