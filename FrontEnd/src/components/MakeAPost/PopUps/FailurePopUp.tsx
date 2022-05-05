import React, { FunctionComponent } from 'react';
import { PopUpProps } from './SuccessPopUp';
import styles from './PopUp.module.scss';
import { Modal, Subtitle1, Button, Subtitle2 } from '@basics';
import { MakeAPost } from '@icons';
import cn from 'classnames';
interface FailurePopUpProps extends PopUpProps {
  retry: () => any;
}

const FailurePopUp: FunctionComponent<FailurePopUpProps> = ({
  onClose,
  open = false,
  retry,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    className={styles.modal}
    parentClassName={styles.failModelWrapper}
    ModalGraphic={{
      icon: MakeAPost.FailPost,
      alt: 'Failed to post',
    }}
  >
    <Subtitle1 className="text-center mt-4">
      Post failed due to server error
    </Subtitle1>
    <div className={styles.supportText}>
      Please do NOT refresh the page and try posting again. If the problem
      persists, please contact our support ASAP! Thank you!
    </div>
    <div className={cn(styles.failPopUpBottom, styles.modalBottomWrapper)}>
      <div>
        <Subtitle2>
          <a href="mailto:homehubdope@gmail.com" className={styles.linkText}>
            Support Email
          </a>
        </Subtitle2>
      </div>
      <Button className="text-center" onClick={retry}>
        <Subtitle2>Post again</Subtitle2>
      </Button>
    </div>
  </Modal>
);

export default FailurePopUp;


