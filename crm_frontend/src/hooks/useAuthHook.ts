import { useContext } from 'react';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

export const useAuthHook = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const getAuthCookieExpiration = () => {
      let date = new Date();
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      return date;
  }

  const setAsLogged = (user: User, token: string) => {
    authContext.setAuth({
      user: user,
      token: token
    });  
    const cookie = new Cookies();
    cookie.set('token', token, {
      path: '/', 
      expires: getAuthCookieExpiration(), 
      sameSite: 'lax', 
      httpOnly: false
    });
  };

  const logout = () => {
    authContext.setAuth({
      user: null,
      token: null
    });  
    const cookie = new Cookies();
    cookie.remove('token', {
      path: '/', 
      expires: getAuthCookieExpiration(), 
      sameSite: 'lax', 
      httpOnly: false
    });
  };

  const isLoggedIn = () => {
    const cookie = new Cookies();
    const token = cookie.get('token');

    if (token) {
      return true;
    }
    return false;
  };

  const getToken = () => {
    const cookie = new Cookies();
    const token = cookie.get('token');
    return token;
  };

  const getAuth = () => {
    return authContext.auth;
  };

  const refreshAuth = async () => {
    try {
      const cookie = new Cookies();
      const token = cookie.get('token');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      setAsLogged(response.data.user, response.data.token);
    } catch (err) {
      console.log('err', err);
      navigate('/login');
    } finally {

    }
  };

  return {
    logout,
    getAuth,
    getToken,
    refreshAuth,
    isLoggedIn,
    setAsLogged
  }
};
