import React, { useState } from 'react';
import { Filters } from '../enums/Filters';

export const GameFilter = ({ search, setSearch, filter, setFilter }) => {
  const [localSearch, setLocalSearch] = useState(search);

  const submitSearch = (ev) => {
    ev.preventDefault();
    setSearch(localSearch);
  };

  return (
    <div className="d-flex flex-row justify-content-between filter-games mx-3">
      <div className="fw-bolder fst-italic d-flex flex-row justify-content-start filter-elements">
        <div 
          onClick={() => setFilter('all')}
          className={`btn-filter ${filter === 'all' ? 'btn-filter-active' : ''}`}
        >
          <img src="/images/all_games_icon.svg" />
          All Games
        </div> 
        <div 
          onClick={() => setFilter('slot')}
          className={`btn-filter ${filter === 'slot' ? 'btn-filter-active' : ''}`}
        >
          <img src="/images/slot_icon.svg" />
          Slot Games
        </div> 
        <div 
          onClick={() => setFilter('progressive')}
          className={`btn-filter ${filter === 'progressive' ? 'btn-filter-active' : ''}`}
        >
          <img src="/images/progressive_icon.svg" />
          Progressive Games
        </div> 
        <div 
          onClick={() => setFilter('live')}
          className={`btn-filter ${filter === 'live' ? 'btn-filter-active' : ''}`}
        >
          <img src="/images/live_icon.svg" />
          Live Games
        </div> 
      </div>
      <div className="search-games">
        <form onSubmit={(ev) => submitSearch(ev)}>
          <div className="input-group">
            <input 
              value={localSearch}
              onChange={(ev) => setLocalSearch(ev.target.value)}
              placeholder="Search Game ..."
              type="text" 
              className="text-dark form-control form-control-sm bg-light placeholder-dark border-0" 
            />
            <span className="input-group-text bg-light border-0">
              <img src="/images/search_icon.svg" />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
