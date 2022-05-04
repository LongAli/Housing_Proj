import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { Container, Row, Col } from 'react-bootstrap';
import { Input, WizardForm } from '@basics';
import { runNTimes } from '@utils';
import { MakeAPost } from '@icons';

interface PageProps {
  numInputs: number;
}

const Page: FunctionComponent<PageProps> = ({ numInputs }) => (
  <Container>
    <Row className="justify-content-center m-2">
      {runNTimes(numInputs, () => (
        <Col md={12}>
          <Input label="Label" type="text" required placeholder="Field..." />
        </Col>
      ))}
    </Row>
  </Container>
);

const newPageSchema = () => z.object({ field1: z.string() });

type Store = z.infer<ReturnType<typeof newPageSchema>>;

interface NPagesProps {
  numPages: number;
  numInputs: number;
  showDefaultPageIcons?: boolean;
}

const NPages: FunctionComponent<NPagesProps> = ({
  numPages,
  numInputs,
  showDefaultPageIcons,
}) => {
  const schemas = runNTimes(numPages, newPageSchema);
  const initialStore = runNTimes(numPages, () => ({
    field1: '',
  }));
  const pageTitles = runNTimes(numPages, () => 'Example Page Title');
  const pageNavigationIcons = showDefaultPageIcons
    ? undefined
    : runNTimes(numPages, () => MakeAPost.Amenity);

  return (
    <WizardForm<Store>
      show
      onHide={() => {}}
      onSubmit={() => true}
      title="Example Title Here"
      pageTitles={pageTitles}
      initialStore={initialStore}
      schemas={schemas}
      pageNavigationIcons={pageNavigationIcons}
    >
      {runNTimes(numPages, () => (
        <Page numInputs={numInputs} />
      ))}
    </WizardForm>
  );
};

export default NPages;
