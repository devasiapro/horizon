import React, { useState, useEffect } from 'react';
import { 
  SimpleGrid, 
  Skeleton,
  Box,
  useToast
} from "@chakra-ui/react";
import axios from 'axios';
import moment from 'moment';
import {
  Chips,
  Ribbon,
  Money,
  MoneyBag,
  Slot,
  Player,
} from "../assets/logo/icons";
import { KPICard } from './KPICard';
import { useAuthHook } from '../hooks/useAuthHook';

export const KPIContainer = ({
  gameSessions,
  currentDateStart,
  currentDateEnd,
  previousDateStart,
  previousDateEnd  
}) => {

  const [ggr, setGgr] = useState({
    current: 0,
    previous: 0,
    movement: 0
  });
  const [totalBets, setTotalBets] = useState({
    current: 0,
    previous: 0,
    movement: 0
  });
  const [totalPlayers, setTotalPlayers] = useState({
    current: 0,
    previous: 0,
    movement: 0
  });
  const [rtp, setRtp] = useState({
    current: 0,
    previous: 0,
    movement: 0
  });
  const [betCount, setBetCount] = useState({
    current: 0,
    previous: 0,
    movement: 0
  });

  const [currentKpi, setCurrentKpi] = useState({
    income: 0,
    bets: 0, 
    total_players: 0, 
    rtp: 0, 
    number_of_spins: 0 
  });
  const [previousKpi, setPreviousKpi] = useState({
    income: 0,
    bets: 0, 
    total_players: 0, 
    rtp: 0, 
    number_of_spins: 0 
  });

  const [isLoading,setIsLoading] = useState(false);
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const toast = useToast();

  const computeMovement = (current, previous) => {
    return ((current - previous) / ((current + previous) / 2 )) * 100
  };

  useEffect(() => {
    const currentGgr = gameSessions
      .current
      .reduce((sum, current) => sum + Number(current.totalIncome), 0);
    console.log('currentGgr', currentGgr);
    const previousGgr = gameSessions
      .previous
      .reduce((sum, current) => sum + Number(current.totalIncome), 0);
    const movementGgr = computeMovement(currentGgr, previousGgr);
    setGgr({current: currentGgr, previous: previousGgr, movement: movementGgr.toFixed(2)});

    const currentTotalBets = gameSessions
      .current
      .reduce((sum, current) => sum + Number(current.totalGameBets), 0);
    const previousTotalBets = gameSessions
      .previous
      .reduce((sum, current) => sum + Number(current.totalGameBets), 0);
    const movementTotalBets = computeMovement(currentTotalBets, previousTotalBets);;
    setTotalBets({
      current: currentTotalBets,
      previous: previousTotalBets,
      movement: movementTotalBets.toFixed(2)
    });

    const currentTotalPlayers = gameSessions.current.reduce((sum, current) => sum + Number(current.playersCount), 0);
    const previousTotalPlayers = gameSessions.previous.reduce((sum, current) => sum + Number(current.playersCount), 0);
    const movementTotalPlayers = computeMovement(currentTotalPlayers, previousTotalPlayers);
    setTotalPlayers({
      current: currentTotalPlayers,
      previous: previousTotalPlayers,
      movement: movementTotalPlayers.toFixed(2)
    }); 

    const currentTotalWins = gameSessions
      .current
      .reduce((sum, current) => sum + Number(current.totalGameWins), 0);
    const previousTotalWins = gameSessions
      .previous
      .reduce((sum, current) => sum + Number(current.totalGameWins), 0);
    const movementTotalWins = computeMovement(currentTotalWins, previousTotalWins);

    const currentRtp = currentTotalWins / currentTotalBets;
    const previousRtp = previousTotalWins / previousTotalBets;
    const movementRtp = (((currentRtp / previousRtp) * 100) - 100);
    setRtp({
      current: (currentRtp * 100).toFixed(2),
      previous: (previousRtp * 100).toFixed(2),
      movement: movementRtp.toFixed(2)
    }); 

    const currentBetCount = gameSessions.current.reduce((sum, current) => sum + Number(current.gamesCount), 0);
    const previousBetCount = gameSessions.previous.reduce((sum, current) => sum + Number(current.gamesCount), 0);
    const movementBetCount = computeMovement(currentBetCount, previousBetCount);

    setBetCount({
      current: currentBetCount,
      previous: previousBetCount,
      movement: movementBetCount.toFixed(2)
    }); 

  }, [gameSessions]);

  return (
    <SimpleGrid
      spacing={{ base: 2, sm: 3, md: 5 }}
      minChildWidth={{ base: "110px", sm: "150px", md: "180px" }}
    >
      <Skeleton isLoaded={!isLoading}>
        <KPICard 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
          label="GGR"
          icon={MoneyBag}
          currentValue={ggr.current} 
          previousValue={ggr.previous} 
          movementValue={ggr.movement}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <KPICard 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
          label="Total Bets"
          icon={Chips}
          currentValue={totalBets.current} 
          previousValue={totalBets.previous} 
          movementValue={totalBets.movement}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <KPICard 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
          label="Total Players"
          icon={Player}
          currentValue={totalPlayers.current} 
          previousValue={totalPlayers.previous} 
          movementValue={totalPlayers.movement}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <KPICard 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
          label="RTP (%)"
          icon={Money}
          currentValue={rtp.current} 
          previousValue={rtp.previous} 
          movementValue={rtp.movement}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <KPICard 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
          label="Bet Count"
          icon={Slot}
          currentValue={betCount.current} 
          previousValue={betCount.previous} 
          movementValue={betCount.movement}
        />
      </Skeleton>
    </SimpleGrid>
  );
};
