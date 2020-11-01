import React, { FC } from 'react';
import { Box, Card, CardContent, InputLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InputNumber } from 'components';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  textField: {
    width: '100%',
  },
});

type Props = {
  fromAmount: number;
  toAmount: number;
  to: string;
  from: string;
  recalculate: (newValue: number) => void;
};

export const Amounts: FC<Props> = ({ from, to, fromAmount, toAmount, recalculate }) => {
  const { textField, card } = useStyles();

  return (
    <Card elevation={3} className={card}>
      <CardContent>
        <InputLabel id="amount">Amount</InputLabel>
        <TextField
          prefix={from}
          id="amount"
          onChange={(event) => recalculate(+event.target.value)}
          className={textField}
          value={fromAmount}
          InputProps={{ inputComponent: InputNumber as any, inputProps: { prefix: `${from} ` } }}
        />
        <Box mt={2}>
          <InputLabel id="result">Result</InputLabel>
          <TextField
            prefix={to}
            id="result"
            disabled
            InputProps={{ inputComponent: InputNumber as any, inputProps: { prefix: `${to} ` } }}
            className={textField}
            value={toAmount}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
