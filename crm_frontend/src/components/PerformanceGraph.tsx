import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import moment from 'moment';
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
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ImArrowUpRight2, ImArrowDownRight2 } from "react-icons/im";

Chart.register(...registerables);

export const PerformanceGraph = ({ 
  gameSessions, 
  currentDateStart, 
  currentDateEnd,
  previousDateStart, 
  previousDateEnd,
}) => {
  const [performances, setPerformances] = useState({
    labels: [],
    datasets: []
  });

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

  useEffect(() => {
    const currentDates = {};
    enumerateDaysBetweenDates(currentDateStart, currentDateEnd).forEach(date => {
      currentDates[date.format('YYYY-MM-DD')] = 0;
    });
    gameSessions.current.forEach(gameSession => {
      currentDates[gameSession.datePlayed] += Number(gameSession.totalIncome);
    });
    const currents = [];
    for (const key in currentDates) {
      currents.push(
        currentDates[key].toFixed(2)
      );
    }

    const previousDates = {};
    enumerateDaysBetweenDates(previousDateStart, previousDateEnd).forEach(date => {
      previousDates[date.format('YYYY-MM-DD')] = 0;
    });
    gameSessions.previous.forEach(gameSession => {
      previousDates[gameSession.datePlayed] += Number(gameSession.totalIncome);
    });
    console.log(previousDates);
    const previouses = [];
    for (const key in previousDates) {
      previouses.push(
        previousDates[key].toFixed(2)
      );
    }
    setPerformances({
      labels: currents.map((current, index) => index + 1),
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
  }, [gameSessions]);

  return (
    <Card>
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
    </Card>
  );
};
