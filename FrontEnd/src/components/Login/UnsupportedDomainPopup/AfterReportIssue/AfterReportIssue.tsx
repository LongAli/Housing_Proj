import { sendEmail } from '@apis';
import { Button, Input, Modal } from '@basics';
import { contactIcons, miscIcons } from '@icons';
import {
  hideReportIssue,
  showEmailConfirmation,
  useShowReportIssue,
  useThunkDispatch,
} from '@redux';
import cn from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import * as z from 'zod';
import styles from './AfterReportIssue.module.scss';

const e = z.string().email('Email is not in a valid format.');

const TritonPng: FunctionComponent = () => <img src={miscIcons.tritonPng} />;

const AfterReportIssue: FunctionComponent = () => {
  const dispatch = useThunkDispatch();
  const shouldShowReportIssue = useShowReportIssue();
  const [userEmail, setEmail] = useState('');
  const validEmail = e.safeParse(userEmail).success;

  return (
    <Modal
      open={shouldShowReportIssue}
      onClose={() => dispatch(hideReportIssue())}
      title="Issue logging in? Report it to us"
      modalGraphic={TritonPng}
    >
      <div className={cn(styles.wrapper, styles.inputWrapper)}>
        <Input
          icon={{ icon: contactIcons.email }}
          placeholder="Please input your UCSD email"
          onChange={(event) => setEmail(event.target.value)}
          isValid={validEmail}
        />
      </div>

      <div className={styles.sendReportWrapper}>
        <Button
          className={styles.sendReportButton}
          variant="solid"
          size="secondary"
          disabled={!validEmail}
          onClick={async () => {
            if (!validEmail) return;

            await sendEmail(userEmail);
            dispatch(hideReportIssue());
            dispatch(showEmailConfirmation());
          }}
        >
          Send report
        </Button>
      </div>
    </Modal>
  );
};

export default AfterReportIssue;
