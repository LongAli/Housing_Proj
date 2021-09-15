import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { Container } from 'react-bootstrap';
import { WizardFormStep, TextArea } from '@basics';
import styles from './NewUserSetup.module.scss';

export const page2Schema = z.object({
  description: z
    .string()
    .min(1, 'You need to provide an introduction for others!')
    .max(600, 'Your introduction can only have maximum of 600 characters'),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  description: '',
};

const PostPage2: FunctionComponent<WizardFormStep<Page2Store>> = ({
  description,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <TextArea
        label="Share a bit more about yourself!"
        as="textarea"
        value={description}
        placeHolder=" What are you up to later? &#13;
        What do you like to do for fun? &#13;&#10;
        The more personal it be, the more likely you will find someone who click!"
        onChange={(e) => setStore({ description: e.target.value })}
        isValid={validations?.description?.success}
        error={validations?.description?.error}
        maxLength={300}
        className={styles.textArea}
      />
    </Container>
  );
};

export default PostPage2 as FunctionComponent;
