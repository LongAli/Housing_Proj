import React, { ComponentProps, FunctionComponent } from 'react';
import {
  WizardForm,
  WizardFormStep,
  Input,
  Dropdown,
  ToggleGroup,
} from '@basics';
import {
  SchoolYear, NON_EMPTY_ERR_MSG, majors, phoneRegex,
} from '@constants';
import * as z from 'zod';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoryTemplate } from '@utils';

export default {
  title: 'WizardForm',
  component: WizardForm,
};

const WizardFormTemplate = StoryTemplate<
  ComponentProps<typeof WizardForm>,
  typeof WizardForm
>(WizardForm);

const schema = z.object({
  name: z.string().nonempty(NON_EMPTY_ERR_MSG),
  email: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .email('Email is not in a valid format.'),
  phone: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(phoneRegex, 'Phone number is not a valid format.'),
  schoolYear: z.nativeEnum(SchoolYear),
  major: z.string().nonempty(NON_EMPTY_ERR_MSG).min(1, 'Not long enough.'),
});

type Store = z.infer<typeof schema>;

const newInitialStore = (): Store => ({
  name: '',
  email: '',
  phone: '',
  schoolYear: SchoolYear.First,
  major: '',
});

const Page: FunctionComponent<WizardFormStep<Store>> = ({
  name,
  email,
  phone,
  schoolYear,
  major,
  validations,
  setStore,
}) => (
  <Container>
    <Row className="justify-content-center m-2">
      <Col md={12}>
        <Input
          label="Name"
          type="text"
          value={name}
          required
          onChange={(e) => setStore({ name: e.target.value })}
          placeholder="Name"
          isValid={validations?.name?.success}
          error={validations?.name?.error}
        />
      </Col>

      <Col sm={12} md={6}>
        <Input
          label="Email"
          type="text"
          value={email}
          required
          onChange={(e) => setStore({ email: e.target.value })}
          placeholder="Email"
          isValid={validations?.email?.success}
          error={validations?.email?.error}
        />
      </Col>

      <Col sm={12} md={6}>
        <Input
          label="Phone"
          type="text"
          value={phone}
          required
          onChange={(e) => setStore({ phone: e.target.value })}
          placeholder="Phone number"
          isValid={validations?.phone?.success}
          error={validations?.phone?.error}
        />
      </Col>

      <Col md={12}>
        <ToggleGroup
          singleSelect
          content={Object.values(SchoolYear)}
          label="School Year"
          toggleClassName="my-0"
          required
          initialSelected={schoolYear}
          onSelect={({ label, selected }) => {
            setStore({
              schoolYear: selected ? (label as SchoolYear) : undefined,
            });
          }}
          error={validations?.schoolYear?.error}
        />
      </Col>

      <Col md={12}>
        <Dropdown
          options={majors}
          label="Major"
          onSelect={(s) => setStore({ major: s || undefined })}
          initialSelected={major}
          placeholder="Major"
          isValid={validations?.major?.success}
          error={validations?.major?.error}
          required
        />
      </Col>
    </Row>
  </Container>
);

// NOTE: need the "as FunctionComponent" since typescript doesn't know that WizardForm parent component will provide the WizardFormStep props
const TypedPage = Page as FunctionComponent;

export const WizardFormExampleWithValidation = WizardFormTemplate.bind({});
WizardFormExampleWithValidation.args = {
  show: true,
  onHide: () => console.log('Clicked!'),
  onSubmit: () => true, // return false to not call onHide
  title: 'Set up your account',
  initialStore: [newInitialStore(), newInitialStore(), newInitialStore()],
  schemas: [schema, schema, schema],
  pageTitles: ['Page Title', 'Page Title', 'Page Title'],
  children: [<TypedPage />, <TypedPage />, <TypedPage />],
};
