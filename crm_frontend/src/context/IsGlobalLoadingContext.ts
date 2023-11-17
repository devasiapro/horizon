import { createContext } from 'react';

export const IsGlobalLoadingContext = createContext({
  isGlobalLoading: false,
  setIsGlobalLoading: val => {}
});
