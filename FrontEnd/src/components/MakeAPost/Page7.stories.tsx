import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import Page7 from './Page7';

export default {
  title: 'Page7',
  component: Page7,
};

const Template = StoryTemplate<ComponentProps<typeof Page7>, typeof Page7>(
  Page7,
);

export const Default = Template.bind({});
