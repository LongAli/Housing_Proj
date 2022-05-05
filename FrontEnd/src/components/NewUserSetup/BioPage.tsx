import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { WizardFormStep, TextArea } from '@basics';
import styles from './NewUserSetup.module.scss';

export const bioPageSchema = z.object({
  description: z
    .string()
    .min(1, 'You need to provide an introduction for others!')
    .max(600, 'Your introduction can only have maximum of 600 characters'),
});

export type BioPageStore = z.infer<typeof bioPageSchema>;

export const bioPageInitialStore: BioPageStore = {
  description: '',
};

const PostBioPage: FunctionComponent<WizardFormStep<BioPageStore>> = ({
  description,
  validations,
  setStore,
}) => {
  return (
    <Container className={styles.bio}>
      <Row className="row justify-content-md-center m-2">
        <div className={styles.bioAsk}>Lastly if you'd like...</div>
      </Row>
      <TextArea
        label="Short bio"
        as="textarea"
        value={description}
        placeHolder=" Share a bit more about yourself!
        What are you up to later? What do you like to do for fun? &#13;&#10;
        The more personal it be, the more likely you will find someone who  click!"
        onChange={(e) => setStore({ description: e.target.value })}
        isValid={validations?.description?.success}
        error={validations?.description?.error}
        maxLength={300}
        className={styles.textArea}
      />
    </Container>
  );
};

export default PostBioPage as FunctionComponent;
