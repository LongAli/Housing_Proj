import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import { amenityIcons } from '@icons';
import Chip from './Chip';

export default {
  title: 'Chip',
  component: Chip,
};

const Template = StoryTemplate<ComponentProps<typeof Chip>, typeof Chip>(Chip);

export const Default = Template.bind({});
Default.args = {
  state: 'default',
  text: 'lol',
  dismiss: false,
  icon: amenityIcons.SmokeFree,
};
