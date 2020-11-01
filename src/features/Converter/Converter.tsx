import React, { FC, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Select, CardHeader, CardContent, InputLabel, MenuItem, Box } from '@material-ui/core';
import { format } from 'date-fns';
import { availableCurrencies } from 'src/constants';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Skeleton } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const { isFetching } = useQuery(['latest', { from, to }], api.convert, {
    onSuccess: ({ rates }) => {
      const newRate = Object.values(rates)[0];
      onSuccessConvertion(newRate);
    },
  });

  return (
    <Card elevation={3}>
      <CardHeader
        title={t('converter.header')}
        subheader={`${t('converter.subheader')}, ${format(new Date(), 'dd-MM-yyyy')}`}
      />
      <CardContent>
        <InputLabel id="from">{t('converter.from')}</InputLabel>
        {isFetching ? (
          <Skeleton variant="rect" height={32} />
        ) : (
          <Fragment>
            <Select
              value={from}
              onChange={(event) => setFrom(event.target.value as string)}
              labelId="from"
              className={select}
            >
              {menuItems}
            </Select>
          </Fragment>
        )}
        <Box mt={2}>
          <InputLabel id="to">{t('converter.to')}</InputLabel>
          {isFetching ? (
            <Skeleton variant="rect" height={32} />
          ) : (
            <Fragment>
              <Select
                value={to}
                onChange={(event) => setTo(event.target.value as string)}
                labelId="to"
                className={select}
              >
                {menuItems}
              </Select>
            </Fragment>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
