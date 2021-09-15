import React, { FunctionComponent } from 'react';
import { PopUpProps } from './SuccessPopUp';
import styles from './PopUp.module.scss';
import { Modal, Subtitle1, Button, Subtitle2 } from '@basics';
import { MakeAPost } from '@icons';
import cn from 'classnames';

interface QuitPopUpProps extends PopUpProps {
  onQuit: () => void;
}

const QuitPopUp: FunctionComponent<QuitPopUpProps> = ({
  onClose,
  open = false,
  onQuit,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    className={styles.modal}
    parentClassName={styles.quitModalWrapper}
    ModalGraphic={{ icon: MakeAPost.QuitPost, alt: 'Quit posting.' }}
  >
    <Subtitle1 className="text-center mt-4">
      Are you sure you want to quit?
    </Subtitle1>
    <div className={styles.supportText}>
      You will lose the content after your refresh.
    </div>
    <div className={cn(styles.failPopUpBottom, styles.modalBottomWrapper)}>
      <Button className={styles.modalButton} onClick={onClose}>
        <Subtitle2>Cancel</Subtitle2>
      </Button>
      <Button
        variant="outline"
        className={styles.modalButton}
        onClick={() => {
          onQuit();
          onClose();
        }}
      >
        <Subtitle2>Quit editing</Subtitle2>
      </Button>
    </div>
  </Modal>
);

export default QuitPopUp;
