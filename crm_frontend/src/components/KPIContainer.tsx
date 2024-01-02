import React, { useState, useEffect } from 'react';
import { 
  SimpleGrid, 
  Skeleton,
  Box,
  useToast
} from "@chakra-ui/react";
import axios from 'axios';

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

  const fetchKpi = async (dateFrom, dateTo) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/report/kpi`, {
        params: {
          date_from: dateFrom,
          date_to: dateTo
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (err) {
    } finally {
    }
  }

  const computeMovementValue = (previousKpiValue, currentKpiValue) => {
    return (((currentKpiValue / previousKpiValue) * 100) - 100).toFixed(2);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all([
          fetchKpi(
            currentDateStart.format('YYYY-MM-DD'), 
            currentDateEnd.format('YYYY-MM-DD')
          ),
          fetchKpi(
            previousDateStart.format('YYYY-MM-DD'), 
            previousDateEnd.format('YYYY-MM-DD')
          )
        ]);
        console.log('responses', responses);
        setCurrentKpi(responses[0].data);
        setPreviousKpi(responses[1].data);
      } catch (err) {
        toast({
          title: 'Error encountered',
          description: 'An error was encountered while fetching data. Please try to reload or report to the Admin.',
          status: 'error',
          isClosable: true 
        });
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
          currentValue={currentKpi.income && currentKpi.income.toLocaleString()} 
          previousValue={previousKpi.income && previousKpi.income.toLocaleString()} 
          movementValue={computeMovementValue(previousKpi.income, currentKpi.income)}
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
          currentValue={currentKpi.bets && currentKpi.bets.toLocaleString()} 
          previousValue={previousKpi.bets && previousKpi.bets.toLocaleString()} 
          movementValue={computeMovementValue(previousKpi.bets, currentKpi.bets)}
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
          currentValue={currentKpi.total_players && currentKpi.total_players.toLocaleString()} 
          previousValue={previousKpi.total_players && previousKpi.total_players.toLocaleString()} 
          movementValue={computeMovementValue(previousKpi.total_players, currentKpi.total_players)}
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
          currentValue={currentKpi.rtp && currentKpi.rtp.toLocaleString()} 
          previousValue={previousKpi.rtp && previousKpi.rtp.toLocaleString()} 
          movementValue={computeMovementValue(previousKpi.rtp, currentKpi.rtp)}
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
          currentValue={currentKpi.number_of_spins && currentKpi.number_of_spins.toLocaleString()} 
          previousValue={previousKpi.number_of_spins && previousKpi.number_of_spins.toLocaleString()} 
          movementValue={computeMovementValue(previousKpi.number_of_spins, currentKpi.number_of_spins)}
        />
      </Skeleton>
    </SimpleGrid>
  );
};
