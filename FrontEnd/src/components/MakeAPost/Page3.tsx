import {
  DatePicker,
  Dropdown,
  SetStore,
  Subtitle2,
  Tooltip,
  WizardFormStep,
} from '@basics';
import { NON_EMPTY_ERR_MSG } from '@constants';
import cn from 'classnames';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export type Page3Store = z.infer<typeof page3Schema>;

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const page3Schema = z
  .object({
    availMonth: z.string().nonempty(NON_EMPTY_ERR_MSG),
    availYear: z.string().nonempty(NON_EMPTY_ERR_MSG),
    untilMonth: z.string().nonempty(NON_EMPTY_ERR_MSG),
    untilYear: z.string().nonempty(NON_EMPTY_ERR_MSG),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => {
    if (
      !!data.availMonth &&
      !!data.availYear &&
      !!data.untilMonth &&
      !!data.untilYear
    ) {
      return (
        (month.indexOf(data.availMonth) <= month.indexOf(data.untilMonth) &&
          parseInt(data.availYear) == parseInt(data.untilYear)) ||
        parseInt(data.availYear) < parseInt(data.untilYear)
      );
    }
    // Not all entries are filled.
    return true;
  }, 'Invalid month/year entered.');

export const page3InitialStore: Page3Store = {
  availMonth: '',
  availYear: '',
  untilMonth: '',
  untilYear: '',
  startDate: '',
  endDate: '',
};

const roomType = [
  'Master Bedroom',
  'Guest Bedroom',
  'Den',
  'Living Room',
  'Other',
] as const;

const year = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear().valueOf() + i).toString(),
);

interface PartProps {
  setStore: SetStore<Page3Store>;
  validations?: any;
}

const combineErrors = (validations: any) =>
  validations?.availMonth?.error ||
  validations?.availYear?.error ||
  validations?.untilMonth?.error ||
  validations?.untilYear?.error;

const Part1: FunctionComponent<
  PartProps & { selectedValues: Partial<Page3Store> }
> = ({ setStore, validations, selectedValues }) => {
  const stayPeriodValidation = useRef<string | z.ZodIssue | undefined>(
    combineErrors(validations),
  );

  useEffect(() => {
    stayPeriodValidation.current = combineErrors(validations);
  }, [validations]);

  return (
    <div className={styles.section}>
      <h5 className={styles.title}>
        Available from <span className={styles.required}>*</span>
      </h5>
      <div className={cn('d-flex')}>
        <Dropdown
          options={month}
          placeholder="--"
          onSelect={(e) => setStore({ availMonth: e ? e : undefined })}
          initialSelected={selectedValues.availMonth}
        ></Dropdown>
        <Dropdown
          options={year}
          placeholder="--"
          className={styles.small}
          onSelect={(e) => setStore({ availYear: e ? e : undefined })}
          initialSelected={selectedValues.availYear}
        ></Dropdown>
      </div>
      <h5 className={cn(styles.body, styles.title2)}>
        Until <span className={styles.required}>*</span>
      </h5>
      <div className={cn('d-flex', styles.test)}>
        <Dropdown
          options={month}
          placeholder="--"
          onSelect={(e) => setStore({ untilMonth: e ? e : undefined })}
          initialSelected={selectedValues.untilMonth}
        ></Dropdown>
        <Dropdown
          options={year}
          placeholder="--"
          className={styles.small}
          onSelect={(e) => setStore({ untilYear: e ? e : undefined })}
          error={stayPeriodValidation.current}
          initialSelected={selectedValues.untilYear}
        ></Dropdown>
      </div>
    </div>
  );
};
const moveInInfo: string =
  'This is an optional input that can help renters know when they are able to move into the place.\n\n Click “Start” to open a calendar to select a range of dates.';
const Part2: FunctionComponent<
  PartProps & { selectedDates: Partial<Page3Store> }
> = ({ setStore, selectedDates }) => (
  <div className={styles.lastSection}>
    <h5 className={cn(styles.title, styles.unbold)}>
      Preferred <span className={styles.bold}> move-in timeframe </span> for
      renters
      <span className={cn(styles.inline, styles.tooltipMargin)}>
        <Tooltip isSingleLine={false} title={moveInInfo}>
          <></>
        </Tooltip>
      </span>
    </h5>
    <DatePicker
      onChange={(startDate, endDate) =>
        setStore({
          startDate: startDate ? startDate.format('MMM/DD/YYYY') : '',
          endDate: endDate ? endDate.format('MMM/DD/YYYY') : '',
        })
      }
      defaultStartDate={
        selectedDates.startDate ? moment(selectedDates.startDate) : null
      }
      defaultEndDate={
        selectedDates.endDate ? moment(selectedDates.endDate) : null
      }
    ></DatePicker>
  </div>
);

const Page3: FunctionComponent<WizardFormStep<Page3Store>> = ({
  setStore,
  validations,
  availMonth = '',
  availYear = '',
  untilMonth = '',
  untilYear = '',
  startDate = '',
  endDate = '',
}) => {
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>
        Rental period &amp; move-in timeframe
      </Subtitle2>
      <div className={styles.description}>
        <Part1
          setStore={setStore}
          validations={validations}
          selectedValues={{
            availMonth,
            availYear,
            untilMonth,
            untilYear,
          }}
        ></Part1>
        <Part2
          setStore={setStore}
          selectedDates={{ startDate, endDate }}
        ></Part2>
      </div>
    </div>
  );
};
export default Page3 as FunctionComponent;
