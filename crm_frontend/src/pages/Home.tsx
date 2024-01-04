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
  
  const currentDateStart = moment().startOf('month');
  const currentDateEnd = moment().subtract(1, 'days');
  const previousDateStart = moment().subtract(1, 'months').startOf('month');
  const previousDateEnd = moment().subtract(1, 'months').subtract(1, 'days');

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
            <IncomePerCategory
              filter={selectedIncomeFilter}
              currentDateStart={currentDateStart}
              currentDateEnd={currentDateEnd}
              previousDateStart={previousDateStart}
              previousDateEnd={previousDateEnd}
            />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Box boxShadow="lg" mb={4}>
              <Skeleton isLoaded={!isLoading}>
                <PerformanceGraph 
                  currentDateStart={currentDateStart}
                  currentDateEnd={currentDateEnd}
                  previousDateStart={previousDateStart}
                  previousDateEnd={previousDateEnd}
                />
              </Skeleton>
            </Box>
            <DistributionChart 
              currentDateStart={currentDateStart}
              currentDateEnd={currentDateEnd}
              previousDateStart={previousDateStart}
              previousDateEnd={previousDateEnd}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
