import { createContext } from 'react';

import { Auth } from '../interfaces/Auth';

const auth: Auth = {
  user: null,
  token: null
};

export const AuthContext = createContext({
  auth: auth,
  setAuth: val => {}
});
