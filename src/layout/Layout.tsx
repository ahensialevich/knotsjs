import React, { FC, useState } from 'react';
import { AppBar, Container, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Converter, Dynamics } from 'features';
import { context } from 'context';
import { Amounts } from 'src/features/Converter/Amounts';

const { Provider } = context;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(2),
  },
}));

export const Layout: FC = () => {
  const { root, toolbar, container } = useStyles();
  const [from, setFrom] = useState('AUD');
  const [to, setTo] = useState('USD');
  const [rate, setRate] = useState(0);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const recalculate = (newValue: number) => {
    setFromAmount(newValue);
    setToAmount(newValue * rate);
  };

  const onSuccessConvertion = (newRate: number) => {
    setRate(newRate);
    setToAmount(fromAmount * newRate);
  };

  const contextValue = { from, to, setTo, setFrom };

  return (
    <main className={root}>
      <Provider value={contextValue}>
        <AppBar position="relative">
          <Toolbar className={toolbar}>
            <Typography variant="h5">Knots.js</Typography>
          </Toolbar>
        </AppBar>
        <Container className={container}>
          <Grid container spacing={2}>
            <Grid item lg={6} alignItems="stretch">
              <Converter
                from={from}
                to={to}
                setFrom={setFrom}
                setTo={setTo}
                onSuccessConvertion={onSuccessConvertion}
              />
            </Grid>
            <Grid item lg={6}>
              <Amounts to={to} from={from} fromAmount={fromAmount} toAmount={toAmount} recalculate={recalculate} />
            </Grid>
          </Grid>
          <Dynamics />
        </Container>
      </Provider>
    </main>
  );
};
