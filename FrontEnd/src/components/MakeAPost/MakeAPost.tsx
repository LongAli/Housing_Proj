import { generateHousingPost, getDurationInMinutes } from '@apis';
import { WizardForm } from '@basics';
import { StudentHousePostPreview } from '@components';
import { genders } from '@constants';
import { useStudentRoomIds, useUser } from '@hooks';
import { MakeAPost as MPIcons } from '@icons';
import { StudentHousePost } from '@models';
import { hidePost, setShowPostType, showPost, useShouldShowPost } from '@redux';
import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Page1, { page1InitialStore, page1Schema, Page1Store } from './Page1';
import Page2, { page2InitialStore, page2Schema, Page2Store } from './Page2';
import Page3, { page3InitialStore, page3Schema, Page3Store } from './Page3';
import Page4, { page4InitialStore, page4Schema, Page4Store } from './Page4';
import Page5, {
  displayAmenities,
  page5InitialStore,
  page5Schema,
  Page5Store,
} from './Page5';
import Page6, { page6InitialStore, page6Schema, Page6Store } from './Page6';
import Page7, { page7InitialStore, page7Schema, Page7Store } from './Page7';
import Page8, { page8InitialStore, page8Schema, Page8Store } from './Page8';
import { SuccessPopUp } from './PopUps';
import { roomCapacities as rCapacities, habits } from '@constants';
import { QuitPopUp, MakeAPostMobile } from './PopUps';
import useBreakpoints from 'use-window-width-breakpoints';

export type Store = Page1Store &
  Page2Store &
  Page3Store &
  Page4Store &
  Page5Store &
  Page6Store &
  Page7Store &
  Page8Store;
const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
  page7Schema,
  page8Schema,
];

interface UserContact {
  major: string;
  schoolYear: string;
  userPhone: string;
  userEmail: string;
  userBio: string;
  userName: string;
  userPhoto: string;
}

const dataProcessHelper = async (
  data: Store & UserContact,
): Promise<StudentHousePost> => {
  const amenities = displayAmenities.filter((elem) => data[elem]);
  const genderSelections = genders.filter((elem) => data[elem]);
  const habitSelections = habits.filter((elem) => data[elem]);
  const roomCapacities = rCapacities.filter((elem) => data[elem]);
  const {
    availMonth,
    availYear,
    untilMonth,
    untilYear,
    startDate,
    endDate,
    rentCost,
    utilityCost,
    lookingForCount,
    photos,
    address,
    placeName,
    numBed,
    numBath,
    roomType,
    placeDescription,
    major,
    schoolYear,
    userName,
    userEmail,
    userPhone,
    userPhoto,
    userBio,
  } = data;
  const apiDistance = await getDurationInMinutes(address);
  const distance = apiDistance || 'N/A';

  return {
    major,
    schoolYear,
    userName,
    userEmail,
    userPhone,
    userPhoto,
    userBio,
    roomType,
    placeDescription,
    numBed,
    numBath,
    roomCapacities,
    address,
    placeName,
    distance,
    lookingForCount,
    startDate,
    endDate,
    amenities,
    availMonth,
    availYear,
    untilMonth,
    untilYear,
    photos,
    utility: utilityCost,
    genders: genderSelections,
    habits: habitSelections,
    rent: rentCost,
  };
};

const initialStoreArray = [
  page1InitialStore,
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  page5InitialStore,
  page6InitialStore,
  page7InitialStore,
  page8InitialStore,
];

const MakeAPost: FunctionComponent = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showQuit, setShowQuit] = useState(false);

  const [cleanUp, setCleanUp] = useState<() => void>();
  const [previewData, setPreviewData] = useState<StudentHousePost>();
  // Mirrors whatever inside wizard form.
  const [postStore, setPostStore] = useState<Partial<Store>[]>(
    initialStoreArray,
  );

  const dispatch = useDispatch();
  const ShouldShowPost = useShouldShowPost();
  const { mutate } = useStudentRoomIds();

  const { data: user } = useUser();
  const breakpoint = useBreakpoints();

  // isLoggedIn should always be true. It is used for ts requirement.
  if (!user.isLoggedIn) {
    return <></>;
  }
  const {
    major,
    schoolYear,
    phone: userPhone,
    email: userEmail,
    description: userBio,
    name: userName,
    profilePhoto: userPhoto,
  } = user;

  const postFunction = async () => {
    if (previewData) {
      const roomForm = new FormData();
      previewData.photos.forEach((photo) => roomForm.append('photos', photo));
      roomForm.append(
        'json',
        JSON.stringify({ ...previewData, photos: undefined }),
      );
      await generateHousingPost(roomForm);
    }
  };

  return (
    <>
      {breakpoint.down.md ? (
        <MakeAPostMobile
          open={ShouldShowPost}
          onClose={() => dispatch(hidePost())}
        />
      ) : (
        <>
          <QuitPopUp
            open={showQuit}
            onClose={() => setShowQuit(false)}
            onQuit={() => dispatch(hidePost())}
          />

          <SuccessPopUp
            open={showSuccess}
            onClose={() => {
              setShowSuccess(false);
            }}
          />

          {showPreview &&
            previewData && ( // need the preview data to be processed
              <StudentHousePostPreview
                post={postFunction}
                onSuccess={async () => {
                  setShowPreview(false);
                  setShowSuccess(true);
                  // Cleans up the form
                  setPostStore(initialStoreArray);
                  setPreviewData(undefined);
                  // Sets the cleanUp function when posting succeeds. The syntax is required by React Hook.
                  setCleanUp(() => () => setCleanUp(undefined));
                  dispatch(setShowPostType('student'));
                  await mutate();
                }}
                onEdit={() => {
                  setShowPreview(false); // normally this isn't a problem, but we could use useEffect if there is
                  dispatch(showPost());
                }}
                {...previewData}
              />
            )}

          <WizardForm<Store>
            show={ShouldShowPost}
            onHide={() => setShowQuit(true)}
            onSubmit={async (data) => {
              setShowPreview(true);
              const post = await dataProcessHelper({
                ...data,
                ...{
                  major,
                  schoolYear,
                  userName,
                  userEmail,
                  userPhone,
                  userPhoto,
                  userBio,
                },
              });
              dispatch(hidePost());
              setPreviewData(post);
              return true;
            }}
            title="Make A Post"
            initialStore={postStore}
            schemas={schemas}
            pageNavigationIcons={[
              MPIcons.Amenity,
              MPIcons.Bed,
              MPIcons.Calendar,
              MPIcons.Dollar,
              MPIcons.Amenity,
              MPIcons.Search,
              MPIcons.Photo,
              MPIcons.Text,
            ]}
            parentOnStoreChange={(updatedStore) => setPostStore(updatedStore)}
            lastButtonText="Preview"
            externalCleanUp={cleanUp}
          >
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
            <Page5 />
            <Page6 />
            <Page7 />
            <Page8 />
          </WizardForm>
        </>
      )}
    </>
  );
};
export default MakeAPost;
