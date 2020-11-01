import { createContext, Dispatch, SetStateAction } from 'react';
import { AppState } from 'src/types';

type ContextType = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
};

export const appContext = createContext<ContextType | null>(null);
