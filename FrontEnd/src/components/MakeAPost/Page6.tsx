import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';
import { TransformArray } from '@utils';
import { WizardFormStep, SetStore, CheckBoxGroup, Subtitle2 } from '@basics';
import cn from 'classnames';

export const genders = ['Prefer female', 'Prefer male', 'Anyone'] as const;

export const habits = [
  'Clean',
  'LGBTQ+ Friendly',
  'No Drinking',
  'No Party',
  '420 Friendly',
  'Overnight Guest OK',
] as const;

export type genderStore = TransformArray<typeof genders, boolean>;
export type habitStore = TransformArray<typeof habits, boolean>;
export type genderStoreZod = TransformArray<typeof genders, z.ZodBoolean>;
export type habitStoreZod = TransformArray<typeof habits, z.ZodBoolean>;

export const page6Schema = z.object({
  ...(genders.reduce(
    (prev, curr) => ({ ...prev, [curr]: z.boolean() }),
    {},
  ) as genderStoreZod),
  ...(habits.reduce(
    (prev, curr) => ({ ...prev, [curr]: z.boolean() }),
    {},
  ) as habitStoreZod),
});

export type Page6Store = z.infer<typeof page6Schema>;

export const page6InitialStore: Page6Store = {
  ...genders.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}),
  ...habits.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}),
} as Page6Store;

interface PartProps {
  setStore: SetStore<Page6Store>;
}

const Part1: FunctionComponent<PartProps & genderStore> = ({
  setStore,
  ...selectedGenderPreferences
}) => (
  <div className={cn('d-flex flex-column', styles.section)}>
    <Subtitle2
      className={cn(
        styles.subtitle2,
        styles.sectionSubtitle2,
        'text-left',
        'mb-3',
      )}
    >
      Gender
    </Subtitle2>
    <div className={styles.sectionWrapper}>
      <CheckBoxGroup
        buttonProps={genders.map((genderOption) => ({
          value: genderOption,
          withLabel: true,
          name: 'gender',
          onChange: (value, state) =>
            setStore({
              [value]: state,
            }),
          checked: selectedGenderPreferences[genderOption],
        }))}
      />
    </div>
  </div>
);

const Part2: FunctionComponent<PartProps & habitStore> = ({
  setStore,
  ...selectedHabits
}) => (
  <>
    <div className={cn('d-flex flex-column', styles.section)}>
      <Subtitle2
        className={cn(
          styles.subtitle2,
          styles.sectionSubtitle2,
          'text-left',
          'mb-3',
        )}
      >
        Habits
      </Subtitle2>
      <div className={styles.sectionWrapper}>
        <CheckBoxGroup
          buttonProps={habits.map((habit) => ({
            value: habit,
            withLabel: true,
            name: 'habit',
            defaultChecked: selectedHabits[habit],
            onChange: (value, state) =>
              setStore({
                [value]: state,
              }),
          }))}
        />
      </div>
    </div>
  </>
);

const Page6: FunctionComponent<WizardFormStep<Page6Store>> = ({
  setStore,
  ...props
}) => (
  <div className={styles.pageHeight}>
    <Subtitle2 className={styles.subtitle2}>Other requests</Subtitle2>
    <div className={styles.sectionBottom}>
      <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
        Who do you want to live with?{' '}
      </Subtitle2>
    </div>
    <Part1
      setStore={setStore}
      {...(Object.fromEntries(
        Object.entries(props).filter(([key]) =>
          genders.includes(key as Partial<keyof genderStore>),
        ),
      ) as genderStore)}
    />
    <Part2
      setStore={setStore}
      {...(Object.fromEntries(
        Object.entries(props).filter(([key]) =>
          habits.includes(key as Partial<keyof habitStore>),
        ),
      ) as habitStore)}
    />
  </div>
);
export default Page6 as FunctionComponent;
