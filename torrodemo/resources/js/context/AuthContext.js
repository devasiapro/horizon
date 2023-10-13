import { createContext } from 'react';

const auth = {
  isSignedIn: false,
  player: null,
  token: '',
};

export const AuthContext = createContext({
  auth: auth,
  setAuth: val => {}
});
