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

  const objectToQueryString = (obj) => {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
    });
    return keyValuePairs.join('&');
  };

  const launchDemoGame = (ev, game) => {
    window.iapiSetClientParams('ngm_desktop', 'language=' + 'en' + '&real=0');
    window.iapiLaunchClient('ngm_desktop', game.code, 'offline', '_blank');
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
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const body = await response.json();
      const sessionToken = body.sessionToken.sessionToken;

      const gameLaunchParams = {
        gameCodeName: game.is_live ? game.code + ';' + game.alias : game.code,
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

  const fetchImageName = (game) => {
    return game.is_live ? game.alias : game.code;
  };

  return (
    <React.Fragment>
      <div className="mx-5 py-4">
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
                <div className="image-wrapper d-flex justify-content-center">
                  <img 
                    src={`/images/games_icons_desktop/${fetchImageName(game)}.jpg`}
                    className="img-fluid" 
                  />
                  <div className={`overlay mb-3 ${game.isHover ? '' : 'd-none'}`}>
                    <div className="d-sm-flex d-lg-none flex-column px-3">
                      <button 
                        type="button"
                        onClick={(ev) => launchActualGame(ev, game)}
                        className="btn-game w-auto flex-fill py-3 mb-3"
                      >
                        Play
                      </button>
                      { !game.is_live &&
                        <button 
                          type="button"
                          onClick={(ev) => launchDemoGame(ev, game)}
                          className="btn-game w-auto flex-fill py-3 mb-3"
                        >
                          Demo
                        </button>
                      }
                    </div>
                    <div className="d-lg-flex justify-content-evenly d-none">
                      <button 
                        type="button"
                        onClick={(ev) => launchActualGame(ev, game)}
                        className="btn-game"
                      >
                        Play
                      </button>
                      { !game.is_live &&
                        <button 
                          type="button"
                          onClick={(ev) => launchDemoGame(ev, game)}
                          className="btn-game"
                        >
                          Demo
                        </button>
                      }
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
