import React, { FC } from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Currencies } from './Currencies';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

export const Layout: FC = () => {
  const { root } = useStyles();

  return (
    <main className={root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">Knots.js</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xl={6}>
          <Box m={2}>
            <Currencies />
          </Box>
        </Grid>
      </Grid>
    </main>
  );
};
