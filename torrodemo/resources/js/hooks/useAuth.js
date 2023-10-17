import { useState, useContext, useEffect } from 'react';
import { Cookies } from "react-cookie";

import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    isSignedIn: false,
    player: null,
    token: '',
  });
  const authContext = useContext(AuthContext);

  const getAuthCookieExpiration = () => {
      let date = new Date();
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      return date;
  }


  const setAsLogged = (player, token) => {

    const cookie = new Cookies();
    cookie.set('is_auth', true, {
      path: '/', 
      expires: getAuthCookieExpiration(), 
      sameSite: 'lax', 
      httpOnly: false
    });
    authContext.setAuth({
      isSignedIn: true,
      player: player,
      token: token
    });
  };

  const setAsLoggedOut = () => {
    const cookie = new Cookies();
    cookie.remove('is_auth', {
      path: '/', 
      expires: getAuthCookieExpiration(), 
      sameSite: 'lax', 
      httpOnly: false
    });
    authContext.setAuth({
      isSignedIn: false,
      player: null,
      token: '' 
    });
  };

  const startupLoginCheck = async () => {
    const cookie = new Cookies();
    if (cookie.get('is_auth')) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/me`);
        authContext.setAuth({
          isSignedIn: true,
          player: response.data.player,
          token: response.data.token
        });
      } catch (err) {
        console.log('err', err);
        setAsLoggedOut();
      }
    } else {
      authContext.setAuth({
        isSignedIn: false,
        player: null,
        token: '' 
      });
    }
    return Promise.resolve();
  };

  const isSignedIn = () => {
    return auth.isSignedIn;
  };

  return {
    auth,
    setAsLogged,
    setAsLoggedOut,
    isSignedIn,
    startupLoginCheck
  };
};
