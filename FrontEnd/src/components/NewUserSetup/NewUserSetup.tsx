import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import BioPage, {
  BioPageStore,
  bioPageInitialStore,
  bioPageSchema,
} from './BioPage';
// Test NamePage
import styles from './NewUserSetup.module.scss';
import NamePage, {
  NamePageStore,
  namePageInitialStore,
  namePageSchema,
} from './NamePage';
import EducationPage, {
  EducationPageStore,
  educationPageInitialStore,
  educationPageSchema,
} from './EducationPage';
import PhonePage, {
  PhonePageStore,
  phonePageInitialStore,
  phonePageSchema,
} from './PhonePage';
import { WizardForm } from '@basics';
import { useUser } from '@hooks';
import {
  endNewUserFlow,
  useShowNewUserPopup,
  useShouldShowLogin,
} from '@redux';

type Store = NamePageStore &
  EducationPageStore &
  PhonePageStore &
  Page1Store &
  BioPageStore;

const schemas = [
  namePageSchema,
  educationPageSchema,
  phonePageSchema,
  page1Schema,
  bioPageSchema,
];

const NewUserSetup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const showNewUserPopup = useShowNewUserPopup();
  const shouldShowLogin = useShouldShowLogin();
  const { createUser } = useUser();
  const [showQuit, setShowQuit] = useState(false);

  if (!showNewUserPopup) return null;

  return (
    <WizardForm<Store>
      show={!!showNewUserPopup && !shouldShowLogin}
      onHide={() => dispatch(endNewUserFlow())}
      onSubmit={(data) => {
        console.log('clicked, set up new user');
        console.log(data);

        // Currently no way for users to select a profile photo. the backend will pick one at random.
        createUser({ ...data, profilePhoto: '' }).then(() =>
          dispatch(endNewUserFlow()),
        );

        return true;
      }}
      title="Set up your account"
      initialStore={[
        {
          ...namePageInitialStore,
          name: showNewUserPopup.name,
        },
        {
          ...educationPageInitialStore,
        },
        {
          ...phonePageInitialStore,
        },
        {
          ...page1InitialStore,
          name: showNewUserPopup.name,
          email: showNewUserPopup.email,
        },
        bioPageInitialStore,
      ]}
      schemas={schemas}
    >
      <NamePage />
      <EducationPage />
      <PhonePage />
      <BioPage />
    </WizardForm>
  );
};

export default NewUserSetup;
