import { Button, Modal } from '@basics';
import { Icon, miscIcons } from '@icons';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { ZodIssue, ZodSchema } from 'zod';
import styles from './WizardForm.module.scss';

export type ValidationError =
  | { success: true; error: undefined; data?: string }
  | { success: false; error: ZodIssue; data?: string }; // TODO maybe make data just undefined here

export type ValidationErrors<P> = Partial<
  {
    [key in keyof P]: ValidationError;
  }
>;

/**
 * Each child component will be given:
 * - nextStep()/prevStep() function to navigate the form
 * - an exit() function to exit the form (i.e. when the user completes the form)
 * - a submitForm() which can be called when you would like to submit the form (it returns T/F based on success of onSubmit and validationChecks)
 * // TODO
 */
type SubmitForm = () => Promise<{ success: boolean; message?: string }>;
export type SetStore<P> = (value: Partial<P>) => void;
export type WizardFormStep<P> = Partial<P> & {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (i: number) => void;
  submitForm: SubmitForm; // returns success or failure with a message
  validations: ValidationErrors<P> | undefined; // validation errors
  setStore: SetStore<P>;
};

export type customModifierFunc<P> = (
  curIndex: number,
  success: boolean,
  storeValues: Partial<P>,
  validations?: ValidationErrors<P> | undefined,
) => {
  [k: string]: { success: boolean; error: ZodIssue | undefined } | undefined;
};

// T is whatever is in the store
interface WizardFormProps<T = {}> {
  children: React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  onHide: () => any;
  title: string;
  pageTitles?: string[];
  pageNavigationIcons?: Icon[];
  onSubmit: (store: T) => boolean | Promise<boolean>;
  initialStore: Partial<T>[];
  schemas: ZodSchema<Partial<T>>[];
  lastButtonAsInactiveArrow?: boolean;
  lastButtonText?: string;
  // External function for parent for utilizing internal store and will be called during set store.
  parentOnStoreChange?: (s: Partial<T>[]) => void;
  // External clean up function to be invoked when defined, e.g. when a post request succeeds.
  // This also indicates the current store and index needs to be reset.
  // TODO: decouple this with default cleanup as well.
  externalCleanUp?: () => void;
  callOnHideOnSubmit?: boolean; // Allow devs to decide whether to call onHide when user clicks Submit.
}

// Not using FunctionComponent as a work around to allow for generics for Wizard Form. Do not do this normally.
/**
 * Wizard Form React Component.
 */
const WizardForm = <T extends {}>({
  children,
  show,
  onHide,
  title,
  pageTitles,
  pageNavigationIcons,
  onSubmit,
  initialStore,
  schemas,
  lastButtonAsInactiveArrow,
  lastButtonText = 'Submit',
  parentOnStoreChange,
  externalCleanUp,
  callOnHideOnSubmit,
}: WizardFormProps<T>) => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(
    curIndex === children.length - 1,
  );
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);

  const [store, setCompleteStore] = useState<Array<Partial<T>>>(initialStore);

  // keeps track of the errors for each field
  const [validations, setValidations] = useState<
    Array<ValidationErrors<Partial<T>> | undefined>
  >(children.map(() => undefined));

  useEffect(() => {
    if (externalCleanUp) {
      setCompleteStore(initialStore);
      setCurIndex(0);
      externalCleanUp();
    }
  }, [externalCleanUp]);

  useEffect(() => {
    setCurStep(children[curIndex]);
    setIsFirst(curIndex === 0);
    setIsLast(curIndex === children.length - 1);
  }, [curIndex, children]);

  /**
   * Use this to exit the wizard form without submitting.
   */
  const exitWizardForm = () => {
    onHide();
  };

  /**
   * combineSuccesses combines Validation Successes into one boolean value. If any
   * of the provided ValidationErrors are unsuccessful, then it will return false.
   * Otherwise this will return true.
   */
  const combineSuccesses = (v: ValidationErrors<Partial<T>>): boolean => (
    (Object.values(v) as Array<ValidationError>).find(
      (data) => !data.success,
    ) === undefined
  );

  /**
   * validatePickedValues is used to validate toParse using the provided schema. It
   * only validates the keys provided in toValidate. This means that you don't have to
   * validate everything inside of toParse (this is helpful so that you don't validate
   * an entire page of the wizard form when only one input is changed).
   *
   * @param schema is the schema used to validate toParse
   * @param toParse holds the values that should be validated/parsed
   * @param toValidate is an array of keys within toParse that should be validated/parsed
   * @param idxToValidate is the index of the page to validate
   * @returns
   */
  const validatePickedValues = <P extends Partial<T>>(
    schema: ZodSchema<P>,
    toParse: P,
    toValidate: Array<keyof P>,
    idxToValidate: number,
  ): ValidationErrors<P> => {
    const parseResult = schema.safeParse(toParse);
    const initialValidationErrors: ValidationErrors<P> = {
      ...validations[idxToValidate],
    };
    // extractFirstError returns the first error from all the errors in a field `key` (if there are any errors in that field)
    const extractFirstError = (
      fieldErrors: { [k: string]: string[] },
      key: keyof P,
    ): string | undefined => {
      const keyExists = key in fieldErrors;
      if (!keyExists) return undefined;

      return fieldErrors[key as string][0];
    };

    // combineErrorsReducer is a reducer to combine the validation errors of the provided keys in toValidate
    const combineErrorsReducer = (
      prevErrors: ValidationErrors<P>,
      curKey: keyof P,
    ): ValidationErrors<P> => {
      // Use parseResult.success instead of success because TypeScript can't compute discriminated unions from destructured values
      let error;
      if (!parseResult.success) {
        const fieldError = extractFirstError(
          parseResult.error.formErrors.fieldErrors,
          curKey,
        );
        // This formError assumes there is only one refine check in the schema.
        // Multiple schemas might need to be defined and merged for multiple refines.
        const formError = parseResult.error.formErrors.formErrors[0];
        error = fieldError || formError;
      }
      return { ...prevErrors, [curKey]: { success: !error, error } };
    };

    const validatedResults = toValidate.reduce(
      combineErrorsReducer,
      initialValidationErrors,
    );

    return validatedResults;
  };

  /**
   * Validates and updates current step.
   *
   * @param i The step to validate.
   * @return If the data is all valid.
   */
  const validateStep = (i: number): boolean => {
    const stepValidations = validatePickedValues<Partial<T>>(
      schemas[i],
      store[i],
      Object.keys(store[i]) as (keyof T)[],
      i,
    );

    setValidations({
      ...validations,
      [i]: { ...validations[i], ...stepValidations },
    });

    return combineSuccesses(stepValidations);
  };

  /**
   * Validates current form step.
   *
   * @return If the data is all valid.
   */
  const validateCurrent = (): boolean => validateStep(curIndex);

  /**
   * Use this to navigate the wizard form to a specific step.
   * This will validate all the steps from the current step
   * to the selected step and navigate to either the first
   * step that is invalid or to the selected step.
   *
   * @param step The step to change to.
   */
  const setStep = (step: number) => {
    // if clicked a later step, validate all steps from current to the selected step
    if (step > curIndex) {
      for (let i = curIndex; i < Math.min(step, children.length); i++) {
        if (!validateStep(i)) {
          setCurIndex(i);
          return;
        }
      }
    }

    // if reached here, all previous steps are valid
    if (step <= 0) setCurIndex(0);
    if (step >= children.length) setCurIndex(children.length - 1);
    setCurIndex(step);
  };

  /**
   * Use this to navigate the wizard form to the next step.
   * This will first validate the current step and will
   * move to the next one if possible.
   */
  const nextStep = () => {
    const dataIsValid = validateCurrent();
    if (dataIsValid && curIndex + 1 < children.length) {
      setCurIndex(curIndex + 1);
    }
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (curIndex - 1 >= 0) setCurIndex(curIndex - 1);
  };

  /**
   * Use this to submit the form (it checks validation values first).
   * Returns T/F based on success of validation values and onSubmit.
   * (i.e. returns false if any validations are false, returns false
   * if onSubmit returns false, otherwise returns true).
   */
  const submitForm: SubmitForm = async () => {
    for (let i = curIndex; i < children.length; i++) {
      if (!validateStep(i)) {
        setCurIndex(i);
        return { success: false, message: "Didn't pass validation." };
      }
    }

    // Everything should be validated by this point
    const combined = Object.values(store).reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }));
    const success = await onSubmit(combined as T);
    if (success && callOnHideOnSubmit) exitWizardForm();
    return { success };
  };

  /**
   * Updates the store and re-validates everything that was changed.
   *
   * @param value is the value to be updated, it should come as an object where the key is the key
   * of the value in the store schema and the value is the new update.
   */
  const setStore: SetStore<T> = (value: Partial<T>) => {
    const changedValues = { ...store[curIndex], ...value };
    setCompleteStore({ ...store, [curIndex]: changedValues });

    if (parentOnStoreChange) {
      parentOnStoreChange({ ...store, [curIndex]: changedValues });
    }

    // get the changed edited fields and set that they were changed
    const changedEditedFields = (Object.keys(value) as Array<keyof T>).reduce<
      Partial<{ [key in keyof T]: boolean }>
    >((prev, key) => {
      prev[key] = true;
      return prev;
    }, {});

    // every time there's a change, validate it
    const changedErrors = validatePickedValues<Partial<T>>(
      schemas[curIndex],
      changedValues,
      Object.keys(changedEditedFields) as (keyof T)[],
      curIndex,
    );

    setValidations({
      ...validations,
      [curIndex]: { ...validations[curIndex], ...changedErrors },
    });
  };

  const TopBar = () => (
    <div className={styles.topBar}>
      <Button variant="wrapper" onClick={onHide}>
        <miscIcons.orangeX />
      </Button>
      <div>
        <h4>{title}</h4>
      </div>
      <div />
    </div>
  );

  const FirstArrow = () => (isFirst ? (
    <Button variant="wrapper">
      <miscIcons.smallLeftArrowDisabled />
    </Button>
  ) : (
    <Button variant="wrapper" onClick={prevStep}>
      <miscIcons.smallLeftArrow />
    </Button>
  ));

  const LastArrow = () => {
    if (isLast) {
      return lastButtonAsInactiveArrow ? (
        <Button variant="wrapper">
          <miscIcons.smallRightArrowDisabled />
        </Button>
      ) : (
        <Button size="secondary" className="m-0" onClick={submitForm}>
          {lastButtonText}
        </Button>
      );
    }

    return (
      <Button variant="wrapper" onClick={nextStep}>
        <miscIcons.smallRightArrow />
      </Button>
    );
  };

  // TODO: add scrollTo feature so that when a page is selected, it's icon will scroll horiontally into view (only appropriate for when there is horizontal scroll)
  const PageSelectors = () => (
    <div className={styles.pageSelectors}>
      {React.Children.map(children, (c, i) => {
        const Icon = pageNavigationIcons
          ? pageNavigationIcons[i]
          : miscIcons.smallEllipseActive;
        const showDefaultIcons = !!pageNavigationIcons;

        return (
          <div
            className={cn(styles.pageNavWrapper, {
              [styles.pageNav]: showDefaultIcons,
              [styles.activePageNav]: showDefaultIcons && i === curIndex,
              [styles.inactivePageNav]: showDefaultIcons && i !== curIndex,
              [styles.pageNavDefault]: !showDefaultIcons,
              [styles.activePageNavDefault]:
                !showDefaultIcons && i === curIndex,
              [styles.inactivePageNavDefault]:
                !showDefaultIcons && i !== curIndex,
            })}
          >
            <Button variant="wrapper" onClick={() => setStep(i)}>
              <Icon />
            </Button>
          </div>
        );
      })}
    </div>
  );

  const BottomBar = () => (
    <div className={styles.bottomBar}>
      <div
        className={cn(
          'align-self-center',
          styles.bottomRow,
          'justify-content-start',
        )}
      >
        <FirstArrow />
      </div>

      <PageSelectors />

      <div
        className={cn(
          'align-self-center',
          styles.bottomRow,
          'justify-content-end',
        )}
      >
        <LastArrow />
      </div>
    </div>
  );

  return (
    <Modal
      open={show}
      onClose={onHide}
      className={styles.modal}
      topBar={<TopBar />}
    >
      <div className={styles.middle}>
        {pageTitles && (
          <div className={styles.pageTitle}>
            <h5>{pageTitles[curIndex]}</h5>
          </div>
        )}

        {React.cloneElement(CurStep, {
          nextStep,
          prevStep,
          setStep,
          exitWizardForm,
          submitForm,
          setStore,
          validations: validations[curIndex],
          ...store[curIndex],
        })}
      </div>

      <BottomBar />
    </Modal>
  );
};

export default WizardForm;
