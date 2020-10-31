import React, { FC } from 'react';
import NumberFormat from 'react-number-format';

type Props = {
  inputRef: (instance: NumberFormat | null) => void;
};

export const InputNumber: FC<Props> = ({ inputRef, ...rest }) => (
  <NumberFormat {...rest} getInputRef={inputRef} decimalScale={2} thousandSeparator />
);
