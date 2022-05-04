import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ImageDropdown, { itemConfig } from './ImageDropdown';

export default {
  title: 'ImageDropdown',
  component: ImageDropdown,
  decorators: [
    (Story) => (
      <div className="d-flex flex-column align-items-center">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<ComponentProps<typeof ImageDropdown>> = (args) => (
  <ImageDropdown {...args} />
);

const itemProps: itemConfig[] = [
  {
    href: 'https://www.linkedin.com/in/criszong/',
    label: 'Cris LinkedIn',
  },
  {
    href:
      'https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/',
    label: 'Kubernetes',
    selected: true,
  },
  {
    href:
      'https://www.psychologytoday.com/us/blog/darwins-subterranean-world/201504/5-natural-reasons-why-life-is-hard',
    label: 'Life is Hard',
  },
];

const imageSrc = 'https://houseit.s3.us-east-2.amazonaws.com/assets/Homehub_logo.png';

export const Default = Template.bind({});
Default.args = {
  profileIcon: imageSrc,
  items: itemProps,
};

export const DropDownInNavbar = Template.bind({});
DropDownInNavbar.args = {
  profileIcon: imageSrc,
  items: itemProps,
};

DropDownInNavbar.decorators = [
  (Story) => (
    <Navbar>
      <Story />
    </Navbar>
  ),
];
