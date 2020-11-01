import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Select, CardHeader, CardContent, InputLabel, MenuItem, Box } from '@material-ui/core';
import { format } from 'date-fns';
import { availableCurrencies } from 'src/constants';
import { useQuery } from 'react-query';
import { api } from 'api';

const menuItems = availableCurrencies.map((key) => (
  <MenuItem key={key} value={key}>
    {key}
  </MenuItem>
));

const useStyles = makeStyles({
  select: {
    width: '100%',
  },
});

type Props = {
  from: string;
  to: string;
  setTo: (value: string) => void;
  setFrom: (value: string) => void;
  onSuccessConvertion: (newRate: number) => void;
};

export const Converter: FC<Props> = ({ from, to, onSuccessConvertion, setTo, setFrom }) => {
  const { select } = useStyles();

  useQuery(['latest', { from, to }], api.convert, {
    onSuccess: ({ rates }) => {
      const newRate = Object.values(rates)[0];
      onSuccessConvertion(newRate);
    },
  });

  return (
    <Card elevation={3}>
      <CardHeader title="Currency converter" subheader={`Today, ${format(new Date(), 'dd-MM-yyyy')}`} />
      <CardContent>
        <InputLabel id="from">From</InputLabel>
        <Select
          value={from}
          onChange={(event) => setFrom(event.target.value as string)}
          labelId="from"
          className={select}
        >
          {menuItems}
        </Select>
        <Box mt={2}>
          <InputLabel id="to">To</InputLabel>
          <Select value={to} onChange={(event) => setTo(event.target.value as string)} labelId="to" className={select}>
            {menuItems}
          </Select>
        </Box>
      </CardContent>
    </Card>
  );
};
