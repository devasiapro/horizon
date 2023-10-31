import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
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

export const PerformanceGraph = ({ performances }) => {
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

  return (
    <Card>
      <CardBody
        px={{ base: 2, sm: 3, md: 5 }}
        pt={1}
      >
        <Box my={2}>
          <Heading size={{ base: "sm", sm: "md" }} color={"horizon.300"}>
            Week-to-Date Performance
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
                20% from last week
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
        {/*
        <Line data={performances} options={options} />
        */}
      </CardBody>
    </Card>
  );
};
