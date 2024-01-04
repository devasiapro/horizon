import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import moment from 'moment';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ImArrowUpRight2, ImArrowDownRight2 } from "react-icons/im";
import { useAuthHook } from '../hooks/useAuthHook';

Chart.register(...registerables);

export const PerformanceGraph = ({ 
  currentDateStart, 
  currentDateEnd,
  previousDateStart, 
  previousDateEnd,
}) => {
  const [performances, setPerformances] = useState({
    labels: [],
    datasets: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: 50000,
        suggestedMax: 10000,
      },
    },
  };

  const useAuth = useAuthHook();
  const token = useAuth.getToken();

  const enumerateDaysBetweenDates = (dateStart, dateEnd) => {
    const dates = [dateStart];
    if (dateStart.format('YYYY-MM-DD') != dateEnd.format('YYYY-MM-DD')) {
      const currDate = moment(dateStart).startOf('day');
      const lastDate = moment(dateEnd).startOf('day');
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone());
      }
      dates.push(dateEnd);
    }
    return dates;
  };

  const fetchDailyReport = async (dateStart, dateEnd) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/report/daily/ggr`, {
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
        setIsLoading(true);
        const responses = await Promise.all([
          fetchDailyReport(
            previousDateStart.format('YYYY-MM-DD'), 
            previousDateEnd.format('YYYY-MM-DD')
          ),
          fetchDailyReport(
            currentDateStart.format('YYYY-MM-DD'), 
            currentDateEnd.format('YYYY-MM-DD')
          )
        ]);

        const previousDaily = responses[0];
        const currentDaily = responses[1];
        const days = [];
        for (const key in currentDaily) {
          days.push(moment(key, 'YYYY-MM-DD').date());
        }

        const currents = [];
        for (const key in currentDaily) {
          currents.push(currentDaily[key].toFixed(2));
        }

        const previouses = [];
        for (const key in previousDaily) {
          previouses.push(previousDaily[key]);
        }
        setPerformances({
          labels: days,
          datasets: [
            {
              label: 'Current Month',
              data: currents,
              borderColor: '#84B332',
              backgroundColor: '#84B332',
            },
            {
              label: 'Last Month',
              data: previouses,
              borderColor: '#374A16',
              backgroundColor: '#374A16',
            } 
          ]
        });

      } catch (err) {
        console.log('err', err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  return (
    <Card>
      <Skeleton isLoaded={!isLoading}>
        <CardBody
          px={{ base: 2, sm: 3, md: 5 }}
          pt={1}
        >
          <Box my={2}>
            <Heading size={{ base: "sm", sm: "md" }} color={"horizon.300"}>
              Month to Date Performance
            </Heading>
          </Box>
          <Box pb={1}>
            <Center>
              <Box pr={10} color={"#84B332"}>
                <HStack>
                  <Icon viewBox="0 0 200 200">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <Text>Current Week</Text>
                </HStack>
              </Box>
              <Box color={"#374A16"}>
                <HStack>
                  <Icon viewBox="0 0 200 200">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <Text>Last Week</Text>
                </HStack>
              </Box>
            </Center>
          </Box>
          <Box
            fontSize="14px"
            boxShadow="base"
            borderRadius="8px"
            px="1"
            py="1"
          >
            <Flex px={2} pb={1}>
              <Text fontWeight={"800"}>Casino Bets</Text>
              <Spacer />
              <HStack spacing={0} fontSize={"10px"}>
                <ImArrowUpRight2 color="#84B332" />
                <Text fontWeight={"800"} pl={1}>
                </Text>
              </HStack>
            </Flex>
            <Box
              height={{ base: "230px", sm: "250px", md: "280px", lg: "175px" }}
              cursor={"pointer"}
            >
              <Line data={performances} options={options} />
            </Box>
          </Box>
        </CardBody>
      </Skeleton>
    </Card>
  );
};
