import { ComponentProps } from 'react';
import { WizardForm } from '@basics';
import { StoryTemplate } from '@utils';
import NPages from './NPages';

export default {
  title: 'WizardForm',
  component: WizardForm,
};

const Template = StoryTemplate<ComponentProps<typeof NPages>, typeof NPages>(
  NPages,
);

export const SimpleExample = Template.bind({});
SimpleExample.args = {
  numPages: 3,
  numInputs: 3,
};

export const OnePage = Template.bind({});
OnePage.args = {
  numPages: 1,
  numInputs: 3,
};

export const OneInput = Template.bind({});
OneInput.args = {
  numPages: 3,
  numInputs: 1,
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  numPages: 30,
  numInputs: 3,
};

export const ManyInputs = Template.bind({});
ManyInputs.args = {
  numPages: 3,
  numInputs: 30,
};

export const ManyPagesAndInputs = Template.bind({});
ManyPagesAndInputs.args = {
  numPages: 30,
  numInputs: 30,
};
