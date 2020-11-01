import React, { FC } from 'react';
import NumberFormat from 'react-number-format';

// source: https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
// Should be refactored, especially typescript integration

type Props = {
  onChange: (event: { target: { value: string } }) => void;
  inputRef: (instance: NumberFormat | null) => void;
};

export const InputNumber: FC<Props> = ({ inputRef, onChange, ...rest }) => (
  <NumberFormat
    {...rest}
    onValueChange={(values) => {
      onChange({
        target: {
          value: values.value,
        },
      });
    }}
    min={0}
    getInputRef={inputRef}
    decimalScale={2}
    thousandSeparator
  />
);
