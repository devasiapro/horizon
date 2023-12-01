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
import { IncomePerCustomer } from '../pages/IncomePerCustomer';
import { KPIContainer } from '../components/KPIContainer';
import { EarningGamesContainer } from '../components/EarningGamesContainer';
import { PerformanceGraph } from '../components/PerformanceGraph';

export const Home = () => {
  const [topData, setTopData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [performances, setPerformances] = useState({
    labels: '',
    datasets: []
  });
  const [selectedIncomeFilter, setSelectedIncomeFilter] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;

  const yesterday = moment().subtract(1, 'days');
  const weekBefore = moment().subtract(8, 'days');

  const currentDateStart = yesterday.clone().weekday(0).format('YYYY-MM-DD');
  const currentDateEnd = yesterday.format('YYYY-MM-DD');
  const previousDateStart = weekBefore.clone().weekday(0).format('YYYY-MM-DD');
  const previousDateEnd = weekBefore.format('YYYY-MM-DD');

  const fetchCustomerIncomes = async (dateFrom, dateTo) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/report/customer-income`, {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };

  const fetchCountryIncomes = async (dateFrom, dateTo) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/report/country-income`, {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
      }
    });
    return response;
  };

  const fetchProductIncomes = async (dateFrom, dateTo) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/product-income`, {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
      }
    });
    return response;
  };


  const generateGraphData = (firstDay, lastDay, incomes) => {
    const labels = [];
    for (let i = firstDay; i <= lastDay; i++) {
      labels.push(parseInt(i));
    }
    const performances = labels.map((label, index) => {
      const earnings = incomes.map(income => {
        const earning = income.daily_earnings.find(earning => {
          const day = moment(earning.date, 'YYYY-MM-DD').format('D');
          return parseInt(label) === parseInt(day);
        });
        return earning ? earning.earning : 0;
      }); 
      const total = earnings.length ? earnings.reduce((total, earning) => {
        return total + earning;
      }) : 0;
      return total;
    });
    console.log('performances', performances);
    return performances;
  }; 

  const processIncomes = async () => {
    let responses;
    setIsLoading(true);
    try {
      if (selectedIncomeFilter === 'country') {
        responses = await Promise.all([
          fetchCountryIncomes(currentDateStart, currentDateEnd),
          fetchCountryIncomes(previousDateStart, previousDateEnd),
        ]);
      } else if (selectedIncomeFilter === 'product') {
        responses = await Promise.all([
          fetchProductIncomes(currentDateStart, currentDateEnd),
          fetchProductIncomes(previousDateStart, previousDateEnd),
        ]);
      } else {
        responses = await Promise.all([
          fetchCustomerIncomes(currentDateStart, currentDateEnd),
          fetchCustomerIncomes(previousDateStart, previousDateEnd),
        ]);
      }
    } catch (err) {
      toast({
        title: 'Error encountered',
        description: 'An error was encountered while fetching the data. Please try to reload or report to the Admin.',
        status: 'error',
        isClosable: true 
      });
    } finally {
      setIsLoading(false);
    }

    const incomeCurrents = responses[0].data;
    const incomePreviouses = responses[1].data;

    const firstDay = yesterday.clone().weekday(0).format('D');
    const lastDay = yesterday.format('D');

    const labels = [];
    for (let i = firstDay; i <= lastDay; i++) {
      labels.push(parseInt(i));
    }

    const currentPerformances = generateGraphData(
      yesterday.clone().weekday(0).format('D'),
      yesterday.format('D'), 
      incomeCurrents
    );

    const previousPerformances = generateGraphData(
      weekBefore.clone().weekday(0).format('D'),
      weekBefore.format('D'), 
      incomePreviouses
    );

    setPerformances({
      labels: labels,
      datasets: [
        {
          label: "Last Week-to-Date",
          data: previousPerformances,
          borderColor: "#374A16",
          tension: 0.3,
          borderWidth: 2,
        },
        {
          label: "Current Week-to-Date",
          data: currentPerformances,
          borderColor: "#84B332",
          tension: 0.3,
          borderWidth: 2,
        },
      ],
    });

    incomeCurrents.sort((a, b) => {
      return b.total_earnings - a.total_earnings;
    });

    const comparedIncomes = incomeCurrents.map((incomeCurrent, index) => {
      const counterPart = incomePreviouses.find((incomePrevious) => {
        return incomePrevious.name === incomeCurrent.name;
      });
      const previous = counterPart ? counterPart.total_earnings : 0;
      let growth = 0;
      if (previous != 0) {
        growth = incomeCurrent.total_earnings
          ? ((incomeCurrent.total_earnings / previous) * 100 - 100).toFixed(2)
          : 0;
      }
      return {
        rank: index + 1,
        name: incomeCurrent.name,
        current_total_earnings: incomeCurrent.total_earnings,
        current_daily_earnings: incomeCurrent.current_daily_earnings,
        last_total_earnings: previous,
        last_daily_earnings: counterPart != undefined ? counterPart.daily_earnings : [],
        growth: growth,
      };
    });
    setTopData(comparedIncomes);
  };

  setTimeout(() => {
    setCurrentDateTime(moment().format('MMM Do YYYY, h:mm:ss a'));
  }, 1000);

  useEffect(() => {
    setCurrentDateTime(moment().format('MMM Do YYYY, h:mm:ss a'));
    processIncomes();
  }, []);

  useEffect(() => {
    processIncomes();
  }, [selectedIncomeFilter]);

  return (
    <Box mx={6} mt={8} mb={8}>
      <Box my={3}>
        <Flex align={"center"}>
          <Heading size={["md", "lg"]} color="horizon.300">
            Week-to-Date Statistics
          </Heading>
          <Spacer />
          <Box bg={"white"} borderRadius={8} px={2}>
            <Flex height={"47px"} align={"center"}>
              <Text>{currentDateTime}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box
        mb={{ base: 3, sm: 6, md: 7, lg: 6 }}
        mt={{ base: 1, sm: 2, md: 4, lg: 6 }}
      >
        <KPIContainer 
          currentDateStart={yesterday.clone().weekday(0)}
          currentDateEnd={yesterday}
          previousDateStart={weekBefore.clone().weekday(0)}
          previousDateEnd={weekBefore}
        />
      </Box>

      <Box>
        <Flex align={"center"} mb="20px">
          <Box bg={"white"} borderRadius={8} px={2}>
            <Flex height={"47px"} align={"center"}>
              <Button 
                variant={selectedIncomeFilter === 'customer' ? 'solid' : 'ghost'}
                mr="10px"
                size="sm"
                type="button"
                colorScheme="horizon"
                onClick={() => setSelectedIncomeFilter('customer')}
              >
                Customer
              </Button>
              <Button 
                variant={selectedIncomeFilter === 'country' ? 'solid' : 'ghost'}
                mr="10px"
                size="sm"
                type="button"
                colorScheme="horizon"
                onClick={() => setSelectedIncomeFilter('country')}
              >
                Country
              </Button>
              <Button 
                variant={selectedIncomeFilter === 'product' ? 'solid' : 'ghost'}
                size="sm"
                type="button"
                colorScheme="horizon"
                onClick={() => setSelectedIncomeFilter('product')}
              >
                Product
              </Button>
            </Flex>
          </Box>
        </Flex>
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
              <IncomePerCustomer
                filter={selectedIncomeFilter}
                topData={topData}
                yesterday={yesterday}
                weekBefore={weekBefore}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Box boxShadow="lg" mb={4}>
              <Skeleton isLoaded={!isLoading}>
                <PerformanceGraph performances={performances} />
              </Skeleton>
            </Box>
            <SimpleGrid columns={2} gap={4}>
              <EarningGamesContainer 
                dateTo={currentDateEnd}
                dateFrom={currentDateStart}
              />
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
