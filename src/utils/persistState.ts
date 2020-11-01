import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function usePersistState<T = Record<string, unknown>>(
  defaultState: T,
  stateKey: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [persistState, setPersistState] = useState<T>(defaultState);

  const saveState = (state: T) => {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem(stateKey, stringifiedState);
  };

  const getPersistState = (key: string) => {
    const stringifiedState = localStorage.getItem(key);
    if (stringifiedState) {
      const parsedState: T = JSON.parse(stringifiedState);
      return parsedState;
    }
    return defaultState;
  };

  useEffect(() => {
    const state = getPersistState(stateKey);
    setPersistState(state);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => saveState(persistState));
  }, [persistState]);

  return [persistState, setPersistState];
}
