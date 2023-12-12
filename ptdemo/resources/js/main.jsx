import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { NavBar } from './components/NavBar';
import { Carousel } from './components/Carousel';
import { DemoMarquee } from './components/DemoMarquee';
import { GamesContainer } from './components/GamesContainer';
import { LoginModal } from './components/LoginModal';

const App = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginErrors, setLoginErrors] = useState({
    username: '',
    password: '',
    general: ''
  });

  const calloutLogin = (response) => {
    console.log('response', response);
    if (response.errorCode && response.errorCode === 48) {
      setLoginErrors({
        username: '',
        password: '',
        general: 'Error code 48 encountered'
      });
      return;
    }

    if (response.errorCode && response.errorCode !== 48) {
      console.log('response.playerMessage', response.playerMessage);
      setLoginErrors({
        username: '',
        password: '',
        general: response.playerMessage 
      });
      return;
    }
    setIsLogin(true);
    setIsShowModal(false);
  };

  const calloutGetLoggedInPlayer = (response) => {
    console.log('calloutGetLoggedInPlayer: response', response);
  };

  const calloutLogout = (response) => {
    console.log('calloutLogout: response', response);
  };

  useEffect(() => {
    window.iapiSetCallout('Login', calloutLogin);
    window.iapiSetCallout('GetLoggedInPlayer', calloutGetLoggedInPlayer);
    window.iapiSetCallout('Logout', calloutLogout);
    window.iapiGetLoggedInPlayer(1);
  }, []);

  return (
    <div>
      <NavBar 
        setIsShowModal={setIsShowModal} 
        setUser={setUser}
        setIsLogin={setIsLogin}
        isLogin={isLogin} 
      />
      <Carousel />
      <DemoMarquee />
      <GamesContainer user={user} isLogin={isLogin} />
      <LoginModal 
        setUser={setUser}
        user={user}
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        errors={loginErrors} 
      />
    </div>
  );
};

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}
