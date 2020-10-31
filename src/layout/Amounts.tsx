import React, { FC } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        <TextField
          type="number"
          onChange={(event) => recalculate(+event.target.value)}
          className={textField}
          value={fromAmount}
        />
      </Grid>
      <Grid item xl>
        <TextField disabled className={textField} value={toAmount} />
      </Grid>
    </Grid>
  );
};
