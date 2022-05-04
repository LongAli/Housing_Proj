import React, {
  useState, useEffect, useRef, FunctionComponent,
} from 'react';
import { Form } from 'react-bootstrap';
import * as z from 'zod';
import { Toggle, ErrorBox } from '@basics';
import RequiredAsterisk from '@basics/RequiredAsterisk';
import { Icon } from '@icons';
import cn from 'classnames';
import { isStringArray } from '@utils';
import styles from './ToggleGroup.module.scss';

export interface ToggleContent {
  icon: Icon;
  label: string;
}

interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  content: string[] | ToggleContent[];
  initialSelected?: boolean[] | string[] | string; // TODO define this to be the same length as content somehow? Also allow this to be an array of strings
  singleSelect?: boolean; // makes it so only one toggle will be selected
  hideLabels?: boolean;
  center?: boolean; // determines whether or not to center the toggles/labels/errors
  onSelect?: (
    newlySelected: { label: string; selected: boolean },
    allSelected: boolean[], // TODO change this to be { label: string; selected: boolean }, and change toggle group to keep track of which are selected with label instead of array of booleans
  ) => any;
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  toggleClassName?: string;
  required?: boolean;
  readOnly?: boolean;
  vertical?: boolean;
  isInvalid?: boolean;
}

/**
 * Gets labels from provided content, which is either array of labels
 * or array of ToggleContent (which stores labels).
 */
const getLabels = (content: string[] | ToggleContent[]): string[] => (content as [ToggleContent | string]).map((c) =>
  (typeof c === 'string' ? c : c.label));

/**
 * Transfers the selected array into an array of booleans describing whether
 * or not the content at that index is selected
 */
const selectedAsBoolArr = (
  content: string[] | ToggleContent[],
  selected: boolean[] | string[] | string,
): boolean[] => {
  if (Array.isArray(selected)) {
    if (!isStringArray(selected)) {
      return selected as boolean[];
    }

    return getLabels(content).map((label) =>
      (selected as string[]).includes(label));
  }

  return getLabels(content).map((label) => label === selected);
};

const ToggleGroup: FunctionComponent<ToggleGroupProps> = ({
  content,
  initialSelected,
  singleSelect,
  hideLabels,
  center,
  isInvalid,
  onSelect,
  label,
  labelClassName,
  error,
  errorClassName,
  toggleClassName,
  required,
  className,
  readOnly,
  vertical,
  ...wrapperProps
}) => {
  const typedInitialSelected = useRef<undefined | boolean[]>(
    initialSelected ? selectedAsBoolArr(content, initialSelected) : undefined,
  );
  const [areSelected, setAreSelected] = useState<boolean[]>(
    typedInitialSelected.current || content.map(() => false),
  );

  return (
    <Form.Group
      className={cn(styles.lineUpToggle, { [styles.center]: center })}
    >
      {(isInvalid || error) && <ErrorBox />}
      {(label || required) && (
        <Form.Label className={cn(styles.label, labelClassName)}>
          {label}
          {' '}
          {required && <RequiredAsterisk />}
        </Form.Label>
      )}

      <div
        {...wrapperProps}
        className={cn(styles.wrapper, className, {
          [styles.center]: center,
        })}
      >
        {(content as [string | ToggleContent]).map((c, index) => {
          const curLabel = typeof c === 'string' ? c : c.label;
          const icon = typeof c === 'string' ? undefined : c.icon;

          return (
            <Toggle
              label={curLabel}
              icon={icon}
              hideLabel={hideLabels}
              initialSelected={
                typedInitialSelected.current
                && typedInitialSelected.current[index]
              }
              selected={areSelected[index]}
              onClick={(newSelected) => {
                const updatedSelected = singleSelect
                  ? areSelected.map((s, i) => index === i)
                  : { ...areSelected, [index]: newSelected };
                setAreSelected(updatedSelected);

                if (onSelect) {
                  onSelect(
                    { label: curLabel, selected: newSelected },
                    updatedSelected,
                  );
                }
              }}
              key={curLabel}
              className={cn(toggleClassName, {
                [styles.lineUpToggle]: !center,
              })}
              readOnly={readOnly}
              vertical={vertical}
            />
          );
        })}
      </div>
    </Form.Group>
  );
};

export default ToggleGroup;
