import React, { FunctionComponent } from 'react';
import { WizardFormStep, Input, Tooltip, SetStore, Subtitle2 } from '@basics';
import { miscIcons } from '@icons';
import cn from 'classnames';
import * as z from 'zod';
import { NON_EMPTY_ERR_MSG } from '@constants';
import styles from './Page.module.scss';

export const page4Schema = z.object({
  rentCost: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(/^\d+$/, 'Incorrect format (number only)'),
  utilityCost: z.string().regex(/^$|^\d+$/, 'Incorrect format (number only)'),
});

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  rentCost: '',
  utilityCost: '',
};

interface PartProps {
  setStore: SetStore<Page4Store>;
  validations?: any;
}

interface InputProps {
  setStore: SetStore<Page4Store>;
  type: string;
  validations?: any;
  value?: string;
}

const utilityInfo: string =
  'Utilities might include \n• Gas/electricty \n• Cable/internet \n• Renter’s insurance \n• Water & Wastewater depend on usage \n• Trash & Recycling/Trash Pickup \n• Pest Control';

const CostInput: FunctionComponent<InputProps> = ({
  setStore,
  type,
  validations,
  value,
}) => (
  <div className={cn('d-flex')}>
    <Input
      icon={{ icon: miscIcons.dollar }}
      isValid={false}
      isInvalid={false}
      readOnly={false}
      placeholder={'--'}
      onChange={(e) => setStore({ [type]: e.target.value })}
      error={validations?.[type]?.error}
      value={value}
    ></Input>
    <span className={cn(styles.text)}>per month per person</span>
  </div>
);

const Part1: FunctionComponent<PartProps & { rentCost: string }> = ({
  setStore,
  validations,
  rentCost,
}) => (
  <div className={styles.section}>
    <h5 className={styles.title}>
      What is the monthly rent per person for this room?{' '}
      <span className={styles.required}>*</span>
    </h5>
    <CostInput
      setStore={setStore}
      validations={validations}
      type="rentCost"
      value={rentCost}
    ></CostInput>
  </div>
);

const Part2: FunctionComponent<PartProps & { utilityCost: string }> = ({
  setStore,
  validations,
  utilityCost,
}) => (
  <div className={styles.lastSection}>
    <h5 className={styles.title3}>
      What is the monthly cost of utilities per person for this room?
    </h5>
    <h6 className={styles.title}>
      (Utility cost could vary A LOT from ~$50 per person per month to $200 per
      house per month)
    </h6>
    <CostInput
      setStore={setStore}
      type="utilityCost"
      validations={validations}
      value={utilityCost}
    ></CostInput>
    <Tooltip
      children={<>"What does “utilities” mean?"</>}
      isSingleLine={false}
      title={utilityInfo}
      className={cn(styles.marginTop)}
      placement={'bottom-start'}
      maxWidth={450}
    ></Tooltip>
  </div>
);

const Page4: FunctionComponent<WizardFormStep<Page4Store>> = ({
  setStore,
  validations,
  rentCost = '',
  utilityCost = '',
}) => {
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>Price range</Subtitle2>
      <div className={styles.description}>
        <Part1
          setStore={setStore}
          validations={validations}
          rentCost={rentCost}
        ></Part1>
        <Part2
          setStore={setStore}
          validations={validations}
          utilityCost={utilityCost}
        ></Part2>
      </div>
    </div>
  );
};
export default Page4 as FunctionComponent;
