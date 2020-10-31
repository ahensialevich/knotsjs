import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Grid, IconButton, Select, CardHeader, CardContent, InputLabel, MenuItem } from '@material-ui/core';
import { SyncAltOutlined } from '@material-ui/icons';
import { format } from 'date-fns';
import { Currencies as CurrenciesEnum } from 'src/types';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Amounts } from './Amounts';

const currArrayFull = Object.values(CurrenciesEnum);
const currArray = currArrayFull.splice(0, currArrayFull.length / 2) as string[];

const menuItems = currArray.map((key) => (
  <MenuItem key={key} value={key}>
    {key}
  </MenuItem>
));

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: '100%',
  },
}));

export const Currencies: FC = () => {
  const { card, select } = useStyles();
  const [from, setFrom] = useState('AUD');
  const [to, setTo] = useState('USD');
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [rate, setRate] = useState(0);

  const recalculate = (newValue: number) => {
    setFromAmount(newValue);
    setToAmount(newValue * rate);
  };

  useQuery(['latest', { from, to }], api.convert, {
    onSuccess: ({ rates }) => {
      setRate(Object.values(rates)[0]);
      recalculate(fromAmount);
    },
  });

  return (
    <Card className={card} elevation={3}>
      <CardHeader title="Currency converter" subheader={`Today, ${format(new Date(), 'dd-MM-yyyy')}`} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xl>
            <InputLabel id="from">From</InputLabel>
            <Select
              value={from}
              onChange={(event) => setFrom(event.target.value as string)}
              labelId="from"
              className={select}
            >
              {menuItems}
            </Select>
          </Grid>
          <Grid item xl={1} component={Box} display="flex" justifyContent="center">
            <IconButton color="secondary">
              <SyncAltOutlined />
            </IconButton>
          </Grid>
          <Grid item xl>
            <InputLabel id="to">To</InputLabel>
            <Select
              value={to}
              onChange={(event) => setTo(event.target.value as string)}
              labelId="to"
              className={select}
            >
              {menuItems}
            </Select>
          </Grid>
        </Grid>
        <Amounts fromAmount={fromAmount} toAmount={toAmount} recalculate={recalculate} />
      </CardContent>
    </Card>
  );
};
