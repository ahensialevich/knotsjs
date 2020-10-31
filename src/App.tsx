import React, { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Layout } from './layout';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const queryCache = new QueryCache();

export const App: FC = () => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <ThemeProvider theme={theme}>
      <Layout />
      <CssBaseline />
    </ThemeProvider>
  </ReactQueryCacheProvider>
);
