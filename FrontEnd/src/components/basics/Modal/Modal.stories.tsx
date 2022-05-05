import React, { ComponentProps, FunctionComponent, ReactElement } from 'react';

import {
  Modal, Subtitle1, Button, Subtitle2, ModalProps,
} from '@basics';
import { miscIcons } from '@icons';
import cn from 'classnames';
import { StoryTemplate } from '@utils/storybook';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FailurePopUp } from '@components/MakeAPost/PopUps';
import { SuccessPopUp } from '@components/MakeAPost';

export default {
  title: 'Modal',
  component: Modal,
};

const Page: FunctionComponent = () => (
  <Container>
    <Row className="justify-content center m-2">
      <Col md={12}>this is basic page</Col>
    </Row>
  </Container>
);

const ModalDemo: FunctionComponent<ModalProps> = (args: ModalProps) => (
  <Modal {...args}>
    <Page />
    <Page />
  </Modal>
);

const ModalTemplate = StoryTemplate<
  ComponentProps<typeof ModalDemo>,
  typeof ModalDemo
>(ModalDemo);

export const ModalExample = FailurePopUp.bind({});

ModalExample.args = {
  onClose: () => console.log('Clicked!'),
  open: true,
  ModalGraphic: {
    icon: miscIcons.congrats,
    alt: 'Congrats',
  },
};
