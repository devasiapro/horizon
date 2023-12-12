import { useEffect, useState } from 'react';
import axios from 'axios';

export const GamesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);

  const username = 'MYR_RJ_WRONG';
  const password = 'cwtrxyre';
  const language = "EN";
  const mode = "real";
  const real = 1;
  const client = 'ngm_desktop';

  const launchGame = (client, game) => {
    const gameCode = game.code;
    window.isapiSetClientParams(client, `language=${language}&real=${real}`);
    window.iapiLaunchClient(client, gameCode, mode, '_self'); 
  }

  const launchDemoGame = (ev, game) => {

  };

  const calloutLogin = (response) => {
    if (response.errorCode) {
      
    } else {
      launchGame();
    }
  };

  const launchActualGame = (ev, game) => {
    console.log('launchActualGame', game);
    window.iapiSetClientType('casino');
    window.iapiSetClientPlatform('web');
    window.iapiLogin(username, password, 1, language); 
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

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get('/api/game');
        setGames(response.data.map(game => {
          game.isHover = false;
          return game;
        }));
        setGames(response.data);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  return (
    <div className="mx-2 py-4">
      <div className="row">
      {
        games.map((game, index) => {
          return (
            <div 
              key={game.id} 
              className="col-2 mb-4" 
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
  );
};
