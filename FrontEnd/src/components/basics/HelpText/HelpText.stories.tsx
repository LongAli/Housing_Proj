import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import HelpText from './HelpText';

export default {
  title: 'HelpText',
  component: HelpText,
};

const Template = StoryTemplate<
  ComponentProps<typeof HelpText>,
  typeof HelpText
>(HelpText);

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  variant: 'default',
  text: 'Text',
  icon: true,
};

export const DefaultWithoutIcon = Template.bind({});
DefaultWithoutIcon.args = {
  variant: 'default',
  text: 'Text',
  icon: false,
};

export const RedWithIcon = Template.bind({});
RedWithIcon.args = {
  variant: 'red',
  text: 'Text',
  icon: true,
};

export const RedWithoutIcon = Template.bind({});
RedWithoutIcon.args = {
  variant: 'red',
  text: 'Text',
  icon: false,
};
