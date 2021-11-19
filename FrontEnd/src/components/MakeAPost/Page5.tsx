import { amenityToIcon, Subtitle2, ToggleGroup, WizardFormStep } from '@basics';
import { NON_EMPTY_ERR_MSG } from '@constants';
import { TransformArray } from '@utils';
import cn from 'classnames';
import React, { FunctionComponent, useRef } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export type Page5Store = {
  [T in Partial<keyof typeof amenityToIcon>]: boolean;
};

export const displayAmenities: Partial<keyof typeof amenityToIcon>[] = [
  'Living Room',
  'Pet Friendly',
  'Furnished',
  'A/C',
  'No Smoking',
  'Indoor Laundry',
  'Outdoor Parking',
  'Indoor Parking',
  'Swimming Pool',
  'Hardwood Floor',
  'Elevator',
  'Gym',
];

export type AmenityStoreZod = TransformArray<
  typeof displayAmenities,
  z.ZodBoolean
>;

export const page5Schema = z
  .object(
    displayAmenities.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: z.boolean(),
      }),
      {},
    ) as AmenityStoreZod,
  )
  .refine(
    (data) =>
      !!data['Living Room'] ||
      !!data['Pet Friendly'] ||
      !!data['Furnished'] ||
      !!data['A/C'] ||
      !!data['No Smoking'] ||
      !!data['Indoor Laundry'] ||
      !!data['Outdoor Parking'] ||
      !!data['Indoor Parking'] ||
      !!data['Swimming Pool'] ||
      !!data['Hardwood Floor'] ||
      !!data['Elevator'] ||
      !!data['Gym'],
    NON_EMPTY_ERR_MSG,
  );

export const page5InitialStore: Page5Store = displayAmenities.reduce(
  (prev, curr) => ({ ...prev, [curr]: false }),
  {},
) as Page5Store;

const Page5: FunctionComponent<WizardFormStep<Page5Store>> = ({
  setStore,
  validations,
  ...props
}) => {
  const initialSelected = useRef(
    displayAmenities.filter((elem) => props[elem]),
  );
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>Amenities</Subtitle2>
      <div className={styles.description}>
        <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
          What does your home offer? <span className={styles.required}>*</span>
        </Subtitle2>
        <div className={styles.body3}>Please select all that apply</div>
      </div>
      <ToggleGroup
        vertical={true}
        content={displayAmenities.map((amenity) => ({
          icon: amenityToIcon[amenity],
          label: amenity,
        }))}
        onSelect={(newlySelected) => {
          setStore({ [newlySelected.label]: newlySelected.selected });
        }}
        error={
          // Error UI should only be displayed when there is nothing selected in the current group and there is an zod error.
          !!initialSelected.current &&
          (validations?.['Living Room']?.error ||
            validations?.['Pet Friendly']?.error ||
            validations?.['Furnished']?.error ||
            validations?.['A/C']?.error ||
            validations?.['No Smoking']?.error ||
            validations?.['Indoor Laundry']?.error ||
            validations?.['Outdoor Parking']?.error ||
            validations?.['Indoor Parking']?.error ||
            validations?.['Swimming Pool']?.error ||
            validations?.['Hardwood Floor']?.error ||
            validations?.['Elevator']?.error ||
            validations?.['Gym']?.error)
        }
        initialSelected={initialSelected.current}
        className={styles.top4NoMargin}
      />
    </div>
  );
};
export default Page5 as FunctionComponent;
