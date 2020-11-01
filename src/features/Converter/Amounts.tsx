import React, { FC, useContext } from 'react';
import { Box, Card, CardContent, InputLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InputNumber } from 'components';
import { useTranslation } from 'react-i18next';
import { appContext } from 'src/context';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  textField: {
    width: '100%',
  },
});

export const Amounts: FC = () => {
  const { textField, card } = useStyles();
  const { t } = useTranslation();
  const context = useContext(appContext);

  const recalculate = (newValue: number) =>
    context?.setState((prevState) => ({ ...prevState, fromAmount: newValue, toAmount: newValue * prevState.rate }));

  return (
    <Card elevation={3} className={card}>
      <CardContent>
        <InputLabel id="amount">{t('amounts.amount')}</InputLabel>
        <TextField
          id="amount"
          onChange={(event) => recalculate(+event.target.value)}
          className={textField}
          value={context?.state.fromAmount}
          InputProps={{ inputComponent: InputNumber as any, inputProps: { prefix: `${context?.state.from} ` } }}
        />
        <Box mt={2}>
          <InputLabel id="result">{t('amounts.result')}</InputLabel>
          <TextField
            id="result"
            disabled
            InputProps={{ inputComponent: InputNumber as any, inputProps: { prefix: `${context?.state.to} ` } }}
            className={textField}
            value={context?.state.toAmount}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
