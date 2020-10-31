import React, { FC } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InputNumber } from 'components';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
}));

type Props = {
  fromAmount: number;
  toAmount: number;
  recalculate: (newValue: number) => void;
};

export const Amounts: FC<Props> = ({ fromAmount, toAmount, recalculate }) => {
  const { container, textField } = useStyles();

  return (
    <Grid className={container} container spacing={3}>
      <Grid item xl>
        <TextField onChange={(event) => recalculate(+event.target.value)} className={textField} value={fromAmount} />
      </Grid>
      <Grid item xl>
        <TextField
          disabled
          InputProps={{ inputComponent: InputNumber as any }}
          className={textField}
          value={toAmount}
        />
      </Grid>
    </Grid>
  );
};
