import React, { FunctionComponent, useState } from 'react';
import { Form, Col, FormControlProps } from 'react-bootstrap';
import { Body2 } from '@basics';
import * as z from 'zod';
import cn from 'classnames';
import { Icon as IconType, miscIcons } from '@icons';
import { useRandomID } from '@hooks';
import styles from './TextArea.module.scss';

interface TextAreaProps extends FormControlProps {
  maxLength: number;
  label?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  controlId?: string;
  defaultContent?: string;
  placeHolder?: string;
  className?: string;
  isInvalid?: boolean;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  maxLength,
  label,
  error,
  controlId,
  isInvalid,
  defaultContent = '',
  readOnly,
  placeHolder = '',
  onChange,
  className,
}) => {
  const randomID = useRandomID(controlId);
  const [content, setContent] = useState<string>(defaultContent);

  // Contains the length of content without any whitespace (excluding spaces)
  const [contentLengthNoWhiteSpace, setContentLengthNoWhiteSpace] = useState<number>(0);

  // Keeps track of if the textarea is in inBulletpointsMode mode
  const [inBulletpointsMode, setInBulletpointsMode] = useState<Boolean>(false);

  // Get the amount of characters that are whitespace (excluding spaces)
  const whiteSpaceLength = content.length - contentLengthNoWhiteSpace;

  // Need this for Form.Control maxLength since we don't want to count whitespace (excluding spaces) as part of the input.
  const maxLengthPlusWhiteSpace = maxLength + whiteSpaceLength;

  const handleNotInBulletpointsMode = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === '*') {
      // Make sure keyboard event doesn't propagate to onChange handler
      e.preventDefault();
      setInBulletpointsMode(true);

      if (
        contentLengthNoWhiteSpace === 0
        || content[content.length - 1] === '\n'
      ) {
        // Start a new list on the same line
        setContent((prevContent) => `${prevContent}* `);
      } else if (contentLengthNoWhiteSpace + 2 <= maxLengthPlusWhiteSpace) {
        // Start a new list on the next line, as long as maxLengthPlusWhiteSpace has not been hit
        setContent((prevContent) => `${prevContent}\n* `);
      }

      setContentLengthNoWhiteSpace((prevLength) => prevLength + 2);
    } else if (['Backspace', 'Delete'].includes(e.key)) {
      // If the deleted character is a newline
      if (content[content.length - 1] === '\n') {
        // Search for the index of the second to last newline
        const lastNewlineIndex = content.lastIndexOf('\n', content.length - 2);

        // No second to last newline exists (only one newline in text area exists before deleting it)
        if (lastNewlineIndex === -1) {
          return;
        }

        // Check if the character after this newline is a bulletpoint
        const isBulletpointLine = content.charAt(lastNewlineIndex + 1) === '*';

        // If it is a '*', then it is a bulletpoint line
        if (isBulletpointLine) {
          setInBulletpointsMode(true);
        }
      }
    }
  };

  const handleInBulletpointsMode = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (['Backspace', 'Delete'].includes(e.key)) {
      // If the deleted character is a '*', then turn off bulletpoints mode
      if (content[content.length - 1] === '*') {
        setInBulletpointsMode(false);
      }
    } else if (
      e.key === 'Enter'
      && contentLengthNoWhiteSpace + 2 <= maxLength
    ) {
      // Make sure keyboard event doesn't propagate to onChange handler
      e.preventDefault();

      // Add another bulletpoint line
      setContent((prevContent) => `${prevContent}\n* `);
      setContentLengthNoWhiteSpace((prevLength) => prevLength + 2);
    } else if (e.key === '*') {
      e.preventDefault();

      // Exit bulletpoints mode
      setInBulletpointsMode(false);

      // Start cursor on new line
      setContent((prevContent) => `${prevContent}\n`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!inBulletpointsMode) {
      handleNotInBulletpointsMode(e);
    } else {
      handleInBulletpointsMode(e);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Contains content of text area without whitespace (excluding spaces)
    const noWhitespaceContent = e.target.value.replace(/[^\S ]/g, '');

    // Count characters without whitespace (excluding spaces)
    setContentLengthNoWhiteSpace(noWhitespaceContent.length);
    setContent(e.target.value);

    if (onChange) onChange(e);
  };

  return (
    <Form.Row className={className}>
      <Form.Group as={Col} controlId={randomID} className="pl-0">
        {label && <Form.Label className={styles.label}>{label}</Form.Label>}
        <div className={styles.formControlWrapper}>
          <Form.Control
            placeholder={placeHolder}
            readOnly={readOnly}
            as="textarea"
            className={cn(styles.content, {
              [styles.unfilled]: content.length === 0,
              [styles.readOnly]: readOnly,
              [styles.invalid]: isInvalid || error,
            })}
            type="text"
            maxLength={maxLengthPlusWhiteSpace}
            value={content}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
          />
          <Body2
            className={cn(styles.charCheck, {
              [styles.charCheckError]: error,
            })}
          >
            {contentLengthNoWhiteSpace}
            /
            {maxLength.toString()}
          </Body2>
        </div>
        {error && <miscIcons.alert className={styles.inputStatus} />}
        {error && <Form.Label className={styles.error}>{error}</Form.Label>}
      </Form.Group>
    </Form.Row>
  );
};

export default TextArea;
