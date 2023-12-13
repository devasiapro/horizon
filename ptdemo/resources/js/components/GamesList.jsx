import React from 'react';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

export const GamesList = ({ filter, user, isLogin, games, setGames }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const language = 'English';
  const languageCode = 'EN';
  const mode = 'real';
  const real = 1;
  const client = 'ngm_desktop';

  const objectToQueryString = (obj) => {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
    });
    return keyValuePairs.join('&');
  };

  const launchDemoGame = (ev, game) => {
    window.iapiSetClientParams(client, 'language=' + 'en' + '&real=0');
    window.iapiLaunchClient(client, game, mode, '_blank');
  };

  const launchActualGame = async (ev, game) => {
    if (!isLogin) {
      setToastMessage('Please login first.'); 
      return;
    }

    window.iapiLoginAndGetTempToken(
      user.username, 
      user.password, 
      language, 
      languageCode
    );
    const queryParams = {
      casinoname: 'flyingdragon88',
      realMode: 'EN',
      serviceType: 'GamePlay',
      systemId: 77,
      clientType: 'casino',
      clientPlatform: 'web',
      clientSkin: 'flyingdragon88',
      languageCode: 'LoginService',
    };

    const url = 'https://login.flyingdragon88.com/LoginAndGetTempToken.php?' 
      + objectToQueryString(queryParams);

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    console.log('url', url);
    try {
      const response = await axios.post(url, formData);
      const sessionToken = response.sessionToken.sessionToken;
      const gameLaunchParams = {
        gameCodeName: 'game', 
        username: user.username,
        tempToken: sessionToken,
        casino: 'flyingdragon88',
        clientPlatform: 'web',
        language: 'EN',
        playMode: 1,
        depositUrl: 'https://google.com&lobbyUrl=https://tools.ptdev.eu/cpsg/kade/technicalerror.html' 
      };
      const gameLaunchUrl = 'https://login.flyingdragon88.com/GameLauncher?'
        + objectToQueryString(gameLaunchParams);
      window.open(gameLaunchUrl);
    } catch (err) {
      console.log('err', err);
    } finally {

    } 
  };

  const onMouseOver = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(updatedGame => updatedGame.id === game.id);
    updatedGame.isHover = true;
    updatedGames.game = updatedGame;
    setGames(updatedGames)
  };
  
  const onMouseOut = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(updatedGame => updatedGame.id === game.id);
    updatedGame.isHover = false;
    updatedGames.game = updatedGame;
    setGames(updatedGames)
  };

  return (
    <React.Fragment>
      <div className="mx-2 py-4">
        <div className="row">
        {
          games.map((game, index) => {
            return (
              <div 
                key={game.id} 
                className="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-4" 
                onMouseOver={(ev) => onMouseOver(ev, game)}
                onMouseOut={(ev) => onMouseOut(ev, game)}
              >
                <div className="image-wrapper">
                  <img 
                    src={`/images/games_icons_desktop/${game.code}.jpg`}
                    className="img-fluid" 
                  />
                  <div className={`overlay mb-3 ${game.isHover ? '' : 'd-none'}`}>
                    <div className="d-flex justify-content-evenly">
                      <button 
                        type="button"
                        onClick={(ev) => launchActualGame(ev, game)}
                        className="btn btn-primary btn-sm"
                      >
                        Play
                      </button>
                      <button 
                        type="button"
                        onClick={(ev) => launchDemoGame(ev, game)}
                        className="btn btn-primary btn-sm"
                      >
                        Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
        </div>
      </div>
      <ToastContainer style={{ position: 'fixed' }} position={'middle-center'}>
        <Toast 
          onClose={() => setToastMessage('')} 
          show={toastMessage} 
          bg={'primary'} 
          delay={5000} 
          autohide
        >
          <Toast.Header>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </React.Fragment>
  );
};
