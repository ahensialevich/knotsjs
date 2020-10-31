import React, { FC, useState } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Converter, Dynamics } from 'features';
import { context } from 'context';

const { Provider } = context;

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const Layout: FC = () => {
  const { root, toolbar } = useStyles();
  const [from, setFrom] = useState('AUD');
  const [to, setTo] = useState('USD');

  const contextValue = { from, to, setTo, setFrom };

  return (
    <main className={root}>
      <Provider value={contextValue}>
        <AppBar position="relative">
          <Toolbar className={toolbar}>
            <Typography variant="h5">Knots.js</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Box m={2}>
            <Converter />
            <Dynamics />
          </Box>
        </Container>
      </Provider>
    </main>
  );
};
