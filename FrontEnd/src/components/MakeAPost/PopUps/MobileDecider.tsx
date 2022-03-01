import { MakeAPost } from '@icons';
import { PopUpProps } from '@components/MakeAPost';
import React, { FunctionComponent } from 'react';
import { Modal, Subtitle1, Button, Subtitle2 } from '@basics';
import styles from './PopUp.module.scss';
import cn from 'classnames';

const MakeAPostMobile: FunctionComponent<PopUpProps> = ({
  onClose,
  open = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={styles.modal}
      ModalGraphic={{
        icon: MakeAPost.FailPost,
        alt: 'Failed to post',
      }}
    >
      <Subtitle1 className="text-center mt-4">
        A bigger screen needed!
      </Subtitle1>
      <div className={styles.supportText}>
        Please make a post using your desktop or enlarge your screen size.
      </div>

      <Button
        onClick={onClose}
        className={cn(styles.mobileBtn)}
      >
        <Subtitle2>Got it</Subtitle2>
      </Button>
    </Modal>
  );
};

export default MakeAPostMobile;
