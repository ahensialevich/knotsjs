import React, { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Layout } from './layout';
import { usePersistState } from './utils/persistState';
import { AppState } from './types';
import { appContext } from './context';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const queryCache = new QueryCache();

const initialAppState: AppState = {
  from: 'AUD',
  to: 'USD',
  rate: 0,
  fromAmount: 0,
  toAmount: 0,
};

const { Provider } = appContext;

export const App: FC = () => {
  const [persistState, setState] = usePersistState<AppState>(initialAppState, 'app');

  const value = {
    state: persistState,
    setState,
  };

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <Provider value={value}>
          <Layout />
        </Provider>
        <CssBaseline />
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};
