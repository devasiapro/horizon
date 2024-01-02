import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Show,
  SimpleGrid,
  Spacer,
  VStack,
  Skeleton,
  useToast
} from "@chakra-ui/react";
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { IncomePerCategory } from '../pages/IncomePerCategory';
import { KPIContainer } from '../components/KPIContainer';
import { EarningGamesContainer } from '../components/EarningGamesContainer';
import { PerformanceGraph } from '../components/PerformanceGraph';
import { DistributionChart } from '../components/DistributionChart';

export const Home = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [performances, setPerformances] = useState({
    labels: '',
    datasets: []
  });
  const [selectedIncomeFilter, setSelectedIncomeFilter] = useState('country');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  
  const [gameSessions, setGameSessions] = useState({
    current: [],
    previous: []
  });

  const currentDateStart = moment().startOf('month');
  const currentDateEnd = moment().subtract(1, 'days');
  const previousDateStart = moment().subtract(1, 'months').startOf('month');
  const previousDateEnd = moment().subtract(1, 'months').subtract(1, 'days');

  const fetchGameSessions = async (dateStart, dateEnd) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/game-session`, {
          params: {
            start_date: dateStart,
            end_date: dateEnd
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    ); 
    return Promise.resolve(response.data);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const responses = await Promise.all([
          fetchGameSessions(
            currentDateStart.format('YYYY-MM-DD'), 
            currentDateEnd.format('YYYY-MM-DD')
          ),
          fetchGameSessions(
            previousDateStart.format('YYYY-MM-DD'), 
            previousDateEnd.format('YYYY-MM-DD')
          ),
        ]);
        setGameSessions({
          current: responses[0],
          previous: responses[1]
        });
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();                 
  }, []);

  useEffect(() => {
  }, [selectedIncomeFilter]);

  return (
    <Box mx={6} mt={8} mb={8}>
      <Box my={3}>
        <Flex align={"center"}>
          <Heading size={["md", "lg"]} color="horizon.300">
            Monthly
          </Heading>
        </Flex>
      </Box>
      <Box
        mb={{ base: 3, sm: 6, md: 7, lg: 6 }}
        mt={{ base: 1, sm: 2, md: 4, lg: 6 }}
      >
        <KPIContainer 
          gameSessions={gameSessions} 
          currentDateStart={currentDateStart}
          currentDateEnd={currentDateEnd}
          previousDateStart={previousDateStart}
          previousDateEnd={previousDateEnd}
        />
      </Box>

      <Box>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem
            colSpan={{ base: 12, lg: 6 }}
            bg={"white"}
            boxShadow="lg"
            borderRadius={"5px"}
          >
            <Skeleton isLoaded={!isLoading}>
              <IncomePerCategory
                filter={selectedIncomeFilter}
                gameSessions={gameSessions}
                dateStart={currentDateStart}
                dateEnd={currentDateEnd}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Box boxShadow="lg" mb={4}>
              <Skeleton isLoaded={!isLoading}>
                <PerformanceGraph 
                  currentDateStart={currentDateStart}
                  currentDateEnd={currentDateEnd}
                  previousDateStart={previousDateStart}
                  previousDateEnd={previousDateEnd}
                  gameSessions={gameSessions} 
                />
              </Skeleton>
            </Box>
            <DistributionChart gameSessions={gameSessions} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
