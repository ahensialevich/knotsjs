import React, { FC, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Select, CardHeader, CardContent, InputLabel, MenuItem, Box } from '@material-ui/core';
import { format } from 'date-fns';
import { availableCurrencies } from 'src/constants';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Skeleton } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { appContext } from 'src/context';

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

export const Converter: FC = () => {
  const { select } = useStyles();
  const { t } = useTranslation();
  const context = useContext(appContext);

  const onSuccessConvertion = (newRate: number) =>
    context?.setState((prevState) => ({ ...prevState, rate: newRate, toAmount: prevState.fromAmount * newRate }));

  const { isFetching } = useQuery(['latest', { from: context?.state.from, to: context?.state.to }], api.convert, {
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
              value={context?.state.from}
              onChange={(event) =>
                context?.setState((prevState) => ({ ...prevState, from: event.target.value as string }))
              }
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
                value={context?.state.to}
                onChange={(event) =>
                  context?.setState((prevState) => ({ ...prevState, to: event.target.value as string }))
                }
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
