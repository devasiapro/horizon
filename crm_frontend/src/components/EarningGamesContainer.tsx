import React, { useState, useEffect } from 'react';
import {
  Box
} from "@chakra-ui/react";
import axios from 'axios';

import { Slot, Live } from "./../assets/logo/icons";
import { EarningGames } from './EarningGames';

export const EarningGamesContainer = ({ dateTo, dateFrom }) => {
  const [gameSlots, setGameSlots] = useState([]);
  const [gameLives, setGameLives] = useState([]);  

  const fetchGameEarning = async (dateTo, dateFrom, gameType, order, count) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/game-earning`, {
      params: {
        date_to: dateTo,
        date_from: dateFrom,
        game_type: gameType,
        order: order,
        count: count, 
      }
    });
    return response;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const responses = await Promise.all([
          fetchGameEarning(dateTo, dateFrom, 'live', 'asc', 10), 
          fetchGameEarning(dateTo, dateFrom, 'slot', 'asc', 10)
        ]);
        setGameSlots(responses[0].data);
        setGameLives(responses[1].data);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };

    init();
  }, []);
  return (
    <React.Fragment>
      <EarningGames 
        title="Top 10 Slot Gams"
        icon={Slot}
        games={gameSlots}
      />
      <EarningGames 
        title="Top 10 Live Games" 
        icon={Live}
        games={gameLives}
      />
    </React.Fragment>
  )
};