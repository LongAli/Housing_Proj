import { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import CheckBoxGroup from './CheckBoxGroup';
import { CheckBoxButtonProps } from './CheckBox';

export default {
  title: 'CheckBoxGroup',
  component: CheckBoxGroup,
};

const Template = StoryTemplate<
  ComponentProps<typeof CheckBoxGroup>,
  typeof CheckBoxGroup
>(CheckBoxGroup);

export const Default = Template.bind({});
Default.args = {
  buttonProps: [
    {
      id: '1', value: 'Cris is DOPE', withLabel: false, name: 'nah',
    },
  ],
};

export const MultipleItems = Template.bind({});
const GroupArgs: CheckBoxButtonProps[] = [
  {
    id: '1',
    value: 'Meh',
    withLabel: false,
  },
  {
    id: '2',
    value: 'RIP',
    withLabel: false,
  },
  {
    id: '3',
    value: 'OOF',
    withLabel: false,
  },
];
MultipleItems.args = { buttonProps: GroupArgs };

export const MultipleItemsWithLabels = Template.bind({});
const GroupLabelArgs: CheckBoxButtonProps[] = [
  {
    id: '1',
    value: 'Meh',
    withLabel: true,
  },
  {
    id: '2',
    value: 'RIP',
    withLabel: true,
  },
  {
    id: '3',
    value: 'OOF',
    withLabel: true,
  },
];
MultipleItemsWithLabels.args = { buttonProps: GroupLabelArgs };

export const MultipleLotsofItems = Template.bind({});
const GroupLotsArgs: CheckBoxButtonProps[] = [
  {
    id: '1',
    value: 'Meh',
    withLabel: true,
  },
  {
    id: '2',
    value: 'RIP',
    withLabel: true,
  },
  {
    id: '3',
    value: 'OOF',
    withLabel: true,
  },
  {
    id: '4',
    value: 'Ha',
    withLabel: true,
  },
  {
    id: '5',
    value: 'Yo',
    withLabel: true,
  },
  {
    id: '6',
    value: 'AH',
    withLabel: true,
  },
  {
    id: '7',
    value: 'Sigh',
    withLabel: true,
  },
  {
    id: '8',
    value: 'Damn',
    withLabel: true,
  },
  {
    id: '9',
    value: 'Huh',
    withLabel: true,
  },
  {
    id: '10',
    value: 'Bad',
    withLabel: true,
  },
  {
    id: '11',
    value: 'JKJK',
    withLabel: true,
  },
  {
    id: '12',
    value: 'Sad af',
    withLabel: true,
  },
];
MultipleLotsofItems.args = { buttonProps: GroupLotsArgs };

export const MultipleLotsofItemsWithSuperLongName = Template.bind({});

const GroupLotsArgsLong: CheckBoxButtonProps[] = [
  {
    id: '1',
    value:
      'Mehwlkjfinkwcjoifewgkrjcnlvijw4iercjmfpv d;okr/sve;krco[dkr;/stvjgcmrselrvjhkr.elw/jmcnh.ela;cm',
    withLabel: true,
  },
  {
    id: '2',
    value: 'RIP',
    withLabel: true,
  },
  {
    id: '3',
    value: 'OOF',
    withLabel: true,
  },
  {
    id: '4',
    value: 'Ha',
    withLabel: true,
  },
  {
    id: '5',
    value: 'Yo',
    withLabel: true,
  },
  {
    id: '6',
    value: 'AH',
    withLabel: true,
  },
  {
    id: '7',
    value: 'Sigh',
    withLabel: true,
  },
  {
    id: '8',
    value: 'Damn',
    withLabel: true,
  },
  {
    id: '9',
    value: 'Huh',
    withLabel: true,
  },
  {
    id: '10',
    value: 'Badjntveso elrjvoeijfmvowelfcjqewn;vtilugekrjsfc h',
    withLabel: true,
  },
  {
    id: '11',
    value: 'JKJK',
    withLabel: true,
  },
  {
    id: '12',
    value: 'Sad afsdlkfniesjanfivelslucsfjnhelirkrjcfnwlervjcnepqorctvniretwc',
    withLabel: true,
  },
];
MultipleLotsofItemsWithSuperLongName.args = { buttonProps: GroupLotsArgsLong };
