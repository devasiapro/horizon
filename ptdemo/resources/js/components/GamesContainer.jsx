import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GameFilter } from './GameFilter';
import { GameFilterMobile } from './GameFilterMobile';
import { GamesList } from './GamesList';
import { Filters } from '../enums/Filters';

export const GamesContainer = ({ user, isLogin }) => {
  // TODO: Use enums instead of strings
  //const [filter, setFilter] = useState<Filters>(Filters.ALL);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);

    if (filter === 'slot') {
      setFilteredGames(games.filter(game => {
        return !game.is_live && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    if (filter === 'progressive') {
      setFilteredGames(games.filter(game => {
        return game.is_progressive && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    if (filter === 'live') {
      setFilteredGames(games.filter(game => {
        return game.is_live && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    setFilteredGames(games.filter(game => {
      return game.name.toLowerCase().includes(search.toLowerCase());
    }));
  }, [filter, search]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get('/api/game');
        setGames(response.data.map(game => {
          game.isHover = false;
          return game;
        }));
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  return (
    <div className="container-games pt-4 pb-4 mb-5">

      <div className="mx-5 row d-lg-none">
        <div className="col">
          <h2>
          {filter.charAt(0).toUpperCase() + filter.slice(1)} Games
          </h2>
        </div>
        <div className="col">
          <div className="input-group">
            <input 
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
              placeholder="Search Game ..."
              type="text" 
              className="text-dark form-control form-control-sm bg-light placeholder-dark border-0" 
            />
            <span className="input-group-text bg-light border-0">
              <img src="/images/search_icon.svg" />
            </span>
          </div>
        </div>
      </div>

      <div className="d-lg-block d-none">
        <GameFilter 
          setSearch={setSearch} 
          search={search} 
          setFilter={setFilter} 
          filter={filter} 
        />
      </div>
      { !isLoading &&
        <GamesList 
          games={filteredGames} 
          setGames={setFilteredGames} 
          user={user} 
          isLogin={isLogin} 
        />
      }
      <GameFilterMobile 
        setSearch={setSearch} 
        search={search} 
        setFilter={setFilter} 
        filter={filter} 
      />
    </div>
  );
};
