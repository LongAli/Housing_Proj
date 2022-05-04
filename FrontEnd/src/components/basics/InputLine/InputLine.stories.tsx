import { ComponentProps } from 'react';
import { miscIcons } from '@icons';
import { StoryTemplate } from '@utils';
import InputLine from './InputLine';

export default {
  title: 'InputLine',
  component: InputLine,
};

const Template = StoryTemplate<
  ComponentProps<typeof InputLine>,
  typeof InputLine
>(InputLine);

export const Default = Template.bind({});
Default.args = {
  icon: { icon: miscIcons.dollar },
  isValid: false,
  isInvalid: false,
  readOnly: false,
};
