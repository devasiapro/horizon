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
  currentDateStart,
  currentDateEnd,
  previousDateStart,
  previousDateEnd  
}) => {
  const [currentKpi, setCurrentKpi] = useState({
    ggr: 0,
    totalBets: 0, 
    totalPlayers: 0, 
    rtp: 0, 
    betCount: 0 
  });
  const [previousKpi, setPreviousKpi] = useState({
    ggr: 0,
    totalBets: 0, 
    totalPlayers: 0, 
    rtp: 0, 
    betCount: 0 
  });

  const [isLoading,setIsLoading] = useState(false);
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const toast = useToast();

  const computeMovement = (current, previous) => {
    if (current + previous === 0) {
      return 0;
    }
    const movement = ((current - previous) / ((current + previous) / 2 )) * 100;
    return movement.toFixed(2);
  };

  const fetchReportKpi = async (dateStart, dateEnd) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/report/kpi`, {
          params: {
            start_date: dateStart.format('YYYY-MM-DD'),
            end_date: dateEnd.format('YYYY-MM-DD'),
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    ); 
    return Promise.resolve(response);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all([
          fetchReportKpi(previousDateStart, previousDateEnd),
          fetchReportKpi(currentDateStart, currentDateEnd)
        ]);
        console.log('responses', responses);
        setPreviousKpi({
          ggr: responses[0]['data']['ggr'],
          totalBets: responses[0]['data']['total_bets'],
          totalPlayers: responses[0]['data']['total_players'],
          rtp: responses[0]['data']['rtp'],
          betCount: responses[0]['data']['bet_count'],
        });
        setCurrentKpi({
          ggr: responses[1]['data']['ggr'],
          totalBets: responses[1]['data']['total_bets'],
          totalPlayers: responses[1]['data']['total_players'],
          rtp: responses[1]['data']['rtp'],
          betCount: responses[1]['data']['bet_count'],
        });
      } catch (errs) {
        console.log('errs', errs);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

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
          currentValue={currentKpi.ggr} 
          previousValue={previousKpi.ggr} 
          movementValue={computeMovement(currentKpi.ggr, previousKpi.ggr)}
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
          currentValue={currentKpi.totalBets} 
          previousValue={previousKpi.totalBets} 
          movementValue={computeMovement(currentKpi.totalBets, previousKpi.totalBets)}
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
          currentValue={currentKpi.totalPlayers} 
          previousValue={previousKpi.totalPlayers} 
          movementValue={computeMovement(currentKpi.totalPlayers, previousKpi.totalPlayers)}
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
          currentValue={currentKpi.rtp} 
          previousValue={previousKpi.rtp} 
          movementValue={computeMovement(currentKpi.rtp, previousKpi.rtp)}
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
          currentValue={currentKpi.betCount} 
          previousValue={previousKpi.betCount} 
          movementValue={computeMovement(currentKpi.betCount, previousKpi.betCount)}
        />
      </Skeleton>
    </SimpleGrid>
  );
};
