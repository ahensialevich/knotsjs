import React, { FC } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Currencies } from './Currencies';

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

  return (
    <main className={root}>
      <AppBar position="relative">
        <Toolbar className={toolbar}>
          <Typography variant="h5">Knots.js</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box m={2}>
          <Currencies />
        </Box>
      </Container>
    </main>
  );
};
