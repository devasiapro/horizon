import React from 'react';
import { GameFilter } from './GameFilter';
import { GamesList } from './GamesList';

export const GamesContainer = ({ user, isLogin }) => {
  return (
    <div className="container-games pt-4 pb-4 mb-5">
      <GameFilter />
      <GamesList user={user} isLogin={isLogin} />
    </div>
  );
};
