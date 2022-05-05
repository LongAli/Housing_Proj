import { StoryTemplate } from '@utils';
import { ComponentProps } from 'react';
import Page2 from './BioPage';

export default {
  title: 'Setup Page2',
  component: Page2,
};

const Template = StoryTemplate<ComponentProps<typeof Page2>, typeof Page2>(
  Page2,
);

export const Default = Template.bind({});
