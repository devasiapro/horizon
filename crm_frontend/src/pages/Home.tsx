import React, { useState, useEffect } from 'react';
import {
  Box,
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
} from "@chakra-ui/react";
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { IncomePerCustomer } from '../pages/IncomePerCustomer';

export const Home = () => {
  const [topData, setTopData] = useState([]);

  const categoryFilter = ["Customer", "Country", "Product"];

  const fetchIncomes = async (dateFrom, dateTo) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer-income`, {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
      }
    });
    return response;
  };

  const yesterday = moment().subtract(1, 'days');
  const weekBefore = moment().subtract(8, 'days');

  const currentDateStart = yesterday.clone().weekday(0).format('YYYY-MM-DD');
  const currentDateEnd = yesterday.format('YYYY-MM-DD');
  const previousDateStart = weekBefore.clone().weekday(0).format('YYYY-MM-DD');
  const previousDateEnd = weekBefore.format('YYYY-MM-DD');

  const processIncomes = async () => {
    const responses = await Promise.all([
      fetchIncomes(currentDateStart, currentDateEnd),
      fetchIncomes(previousDateStart, previousDateEnd),
    ]);

    const incomeCurrents = responses[0].data;
    const incomePreviouses = responses[1].data;
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

  useEffect(() => {
    processIncomes();
  }, []);

  const handleCategoryFilerChange = async () => {
  };

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
              {/** TODO: Filter buttons **/}
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box
        mb={{ base: 3, sm: 6, md: 7, lg: 6 }}
        mt={{ base: 1, sm: 2, md: 4, lg: 6 }}
      >
        {/** TODO: KPI Grid **/}
      </Box>

      <Box>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem
            colSpan={{ base: 12, lg: 6 }}
            bg={"white"}
            boxShadow="lg"
            borderRadius={"5px"}
          >
            <IncomePerCustomer
              topData={topData}
              yesterday={yesterday}
              weekBefore={weekBefore}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
