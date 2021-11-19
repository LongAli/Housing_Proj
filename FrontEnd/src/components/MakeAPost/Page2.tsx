import {
  Dropdown,
  RadioGroup,
  SetStore,
  Subtitle2,
  ToggleGroup,
  Tooltip,
  WizardFormStep,
} from '@basics';
import { NON_EMPTY_ERR_MSG } from '@constants';
import { roomTypeIconsTemp } from '@icons';
import { ArrayUnionTransform, TransformArray } from '@utils';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export const roomTypes = [
  'Master Bedroom',
  'Guest Bedroom',
  'Den',
  'Living Room',
] as const;

export const roomCapacity = ['Single', 'Double', 'Triple'] as const;

export type RoomCapacityStore = TransformArray<typeof roomCapacity, boolean>;
type TypesOfRooms = ArrayUnionTransform<typeof roomTypes>;
export type RoomCapacityStoreZod = TransformArray<
  typeof roomCapacity,
  z.ZodBoolean
>;

export const page2Schema = z
  .object({
    roomType: z.string().nonempty(NON_EMPTY_ERR_MSG),
    ...(roomCapacity.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: z.boolean(),
      }),
      {},
    ) as RoomCapacityStoreZod),
    lookingForCount: z.string(),
  })
  .refine(
    (data) => !!data.Single || !!data.Double || !!data.Triple,
    NON_EMPTY_ERR_MSG,
  );

export type Page2Store = z.infer<typeof page2Schema> & RoomCapacityStore;

const defaultRoomCapacity = roomCapacity.reduce(
  (prev, curr) => ({ ...prev, [curr]: false }),
  {},
) as RoomCapacityStore;

export const page2InitialStore: Page2Store = {
  ...defaultRoomCapacity,
  roomType: '',
  lookingForCount: '',
};

const people = Array.from({ length: 6 }, (_, i) => (i + 1).toString());

interface PartProps {
  setStore: SetStore<Page2Store>;
  validations?: any;
}

type roomToIconOptions = { [key: string]: any };

const roomToIcon: roomToIconOptions = {
  Single: roomTypeIconsTemp.single,
  Double: roomTypeIconsTemp.double,
  Triple: roomTypeIconsTemp.triple,
};

const Part1: FunctionComponent<PartProps & { initialSelected: string[] }> = ({
  setStore,
  initialSelected,
  validations,
}) => (
  <div className={styles.section}>
    <h5 className={styles.title3}>
      How many people does the listed room hold?{' '}
      <span className={styles.required}>*</span>
    </h5>
    <div className={cn(styles.offset, 'mt-3')}>
      <ToggleGroup
        content={roomCapacity.map((room) => ({
          icon: roomToIcon[room],
          label: room,
        }))}
        className={styles.leftAlign}
        error={
          // Error UI should only be displayed when there is nothing selected in the current group and there is an zod error.
          !!initialSelected &&
          (validations?.Single?.error ||
            validations?.Double?.error ||
            validations?.Triple?.error)
        }
        onSelect={(newlySelected) => {
          setStore({ [newlySelected.label]: newlySelected.selected });
        }}
        initialSelected={initialSelected}
        toggleClassName={'mt-0'}
      />
    </div>
  </div>
);

const roomTypeInfo: string =
  '• Master Bedroom = bedroom with bathroom \n • Guest Bedroom = standard bedroom \n• Living Room =  divided common area for bed \n• Den = secondary converted common area \n';

const Part2: FunctionComponent<PartProps & { roomType: string }> = ({
  setStore,
  roomType,
  validations,
}) => (
  <div className={styles.section}>
    <h5 className={styles.title}>
      What kind of room is this? <span className={styles.required}>*</span>{' '}
      <span className={styles.inline}>
        <Tooltip isSingleLine={false} title={roomTypeInfo} maxWidth={600}>
          <></>
        </Tooltip>
      </span>
    </h5>
    <RadioGroup
      className={cn(styles.radioGroup, styles.offset)}
      error={validations?.roomType?.error}
      wrapperClass={styles.radioMarginLarge}
      buttonProps={roomTypes.map((room) => ({
        value: room,
        withLabel: true,
        name: 'room',
        checked: roomType === room,
        onChange: (event) =>
          setStore({
            roomType: (event.target as HTMLInputElement)
              .value as Partial<TypesOfRooms>,
          }),
      }))}
    />
  </div>
);

const Part3: FunctionComponent<PartProps & { initialSelected: string }> = ({
  setStore,
  initialSelected,
}) => (
  <div className={styles.lastSection}>
    <h5 className={styles.title}>
      How many people are you looking to fill this space?
    </h5>
    <div className={cn('d-flex')}>
      <Dropdown
        options={people}
        placeholder="--"
        className={styles.small}
        onSelect={(e) => setStore({ lookingForCount: e ? e : undefined })}
        initialSelected={initialSelected}
      ></Dropdown>
      <span className={cn(styles.text)}>people</span>
    </div>
  </div>
);

const Page2: FunctionComponent<WizardFormStep<Page2Store>> = ({
  setStore,
  roomType = '',
  validations,
  Single,
  Double,
  Triple,
  lookingForCount = '',
}) => {
  const roomCapBoolMap = { Single, Double, Triple };
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>List one room</Subtitle2>
      <div className={styles.description}>
        <Part1
          setStore={setStore}
          validations={validations}
          initialSelected={Object.keys(roomCapBoolMap).filter(
            (elem) => roomCapBoolMap[elem as keyof typeof roomCapBoolMap],
          )}
        ></Part1>
        <Part2
          setStore={setStore}
          roomType={roomType}
          validations={validations}
        ></Part2>
        <Part3 setStore={setStore} initialSelected={lookingForCount}></Part3>
      </div>
    </div>
  );
};
export default Page2 as FunctionComponent;
