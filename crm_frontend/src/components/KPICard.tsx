import React from 'react';
import {
  Spacer,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  HStack,
  Box,
  Image,
  Stack,
  Icon,
  Center,
} from "@chakra-ui/react";
import {
  Chips,
  Ribbon,
  Money,
  MoneyBag,
  Slot,
  Player,
} from "../assets/logo/icons";

export const KPICard = ({
  label, 
  icon,
  currentDateStart,
  currentDateEnd,
  previousDateStart,
  previousDateEnd,
  currentValue,
  previousValue,
  movementValue,
  currencySymbol
}) => {
  return (
    <Card
      _hover={{
        boxShadow: "xl",
      }}
      color={"horizon.300"}
      bg={"white"}
      boxShadow={"lg"}
    >
      <CardBody p={{ base: "6px", sm: "6px", md: "6px", lg: "6px" }}>
        <Flex>
          <Text
            fontWeight="extrabold"
            fontSize={"28px"}
          >
            {label}
          </Text>
          <Spacer />
          <Icon
            as={icon}
            boxSize={{ base: 6, sm: 6, md: 6, lg: 6 }}
            ml={{ base: "2px", md: 2 }}
          /> 
        </Flex>

        <Center>
          <Text
            fontWeight="extrabold"
            fontSize={"28px"}
          >
            {currencySymbol} {currentValue && currentValue.toLocaleString()}
          </Text>
        </Center>
        <Center>
          <Text fontSize={"12px"}>
            {currentDateStart.format('MMM DD')} - {currentDateEnd.format('MMM DD')}
          </Text>
        </Center>

        <Flex>
          <Box>
            <Text fontSize={"16px"}>
              {currencySymbol} {previousValue && previousValue.toLocaleString()}
            </Text>
            <Text fontSize={"12px"}>
              {previousDateStart.format('MMM DD')} - {previousDateEnd.format('MMM DD')}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Stat size={"xl"}>
              {movementValue > 0 ? (
                <StatNumber>
                  <StatArrow type="increase" />
                  {movementValue}%
                </StatNumber>
              ) : (
                <StatNumber>
                  <StatArrow type="decrease" />
                  {movementValue}%
                </StatNumber>
              )}
            </Stat>
          </Box>
        </Flex>
      </CardBody> 
    </Card>
  );
};
