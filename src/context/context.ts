import { createContext } from 'react';

type ContextType = {
  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
};

export const context = createContext<ContextType>({
  from: '',
  to: '',
  setFrom: console.log,
  setTo: console.log,
});
