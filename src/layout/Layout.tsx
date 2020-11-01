import React, { FC } from 'react';
import { AppBar, Container, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Converter, Dynamics } from 'features';
import { Amounts } from 'src/features/Converter/Amounts';

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

  return (
    <main className={root}>
      <AppBar position="relative">
        <Toolbar className={toolbar}>
          <Typography variant="h5">Knots.js</Typography>
        </Toolbar>
      </AppBar>
      <Container className={container}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item md={6} xs={12}>
            <Converter />
          </Grid>
          <Grid item md={6} xs={12}>
            <Amounts />
          </Grid>
        </Grid>
        <Dynamics />
      </Container>
    </main>
  );
};
