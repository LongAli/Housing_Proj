import Body2 from '@basics/Body2';
import Input from '@basics/Input';
import { miscIcons } from '@icons';
import cn from 'classnames';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PlacesAutocomplete, { PropTypes } from 'react-places-autocomplete';
import * as z from 'zod';
import styles from './GooglePlaceAutoComplete.module.scss';

interface GooglePlaceAutoCompleteProps
  extends Pick<PropTypes, 'onChange' | 'onSelect'> {
  className?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  isInvalid?: boolean;
  defaultAddress?: string;
}

const GooglePlaceAutoComplete: React.FC<GooglePlaceAutoCompleteProps> = ({
  onChange,
  onSelect,
  defaultAddress = '',
  error,
  isInvalid,
}) => {
  const [address, setAddress] = useState<string>(defaultAddress);

  return (
    <div className={styles.wrapper}>
      <PlacesAutocomplete
        value={address}
        onChange={() => {
          setAddress(address);
          if (onChange) {
            onChange(address);
          }
        }}
        onSelect={() => {
          setAddress(address);
          if (onSelect) {
            onSelect(address, '');
          }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className={styles.body}>
            <Input
              icon={{ icon: miscIcons.LocationIcon }}
              {...getInputProps({
                placeholder: 'Select your address',
                className: styles.input,
              })}
              className={cn({ [styles.invalid]: isInvalid || error })}
            />
            <div className={styles.suggestionWrapper}>
              {suggestions.map((suggestion) => (
                // TODO: Missing "key" prop for element in iterator
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: cn(styles.suggestion),
                  })}
                >
                  <Body2 className={styles.body2}>
                    {suggestion.description}
                  </Body2>
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {error && <Form.Label className={cn(styles.error)}>{error}</Form.Label>}
    </div>
  );
};

export default GooglePlaceAutoComplete;
