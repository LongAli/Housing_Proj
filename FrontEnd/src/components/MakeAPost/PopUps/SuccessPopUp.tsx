import React, { FunctionComponent } from 'react';
import styles from './PopUp.module.scss';
import { Modal, Subtitle1, Button, Subtitle2 } from '@basics';
import { miscIcons } from '@icons';
import cn from 'classnames';
export interface PopUpProps {
  onClose: () => any;
  open?: boolean;
}

const SuccessPopUp: FunctionComponent<PopUpProps> = ({
  onClose,
  open = false,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    className={styles.modal}
    parentClassName={styles.successModalWrapper}
    ModalGraphic={{
      icon: miscIcons.congrats,
      alt: 'Post succeeded!',
    }}
  >
    <Subtitle1 className="text-center mt-4">
      You’ve successfully posted it!
    </Subtitle1>
    <div className={styles.SuccessSupportText}>
      Peers who are interested will contact through your email or phone! Please
      remember to check!
    </div>
    <div
      className={cn('d-flex justify-content-center', styles.modalBottomWrapper)}
    >
      <Button className={styles.modalButton} onClick={onClose}>
        <Subtitle2>Got it!</Subtitle2>
      </Button>
    </div>
  </Modal>
);

export default SuccessPopUp;
