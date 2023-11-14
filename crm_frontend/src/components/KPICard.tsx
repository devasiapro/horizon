import React from 'react';
import {
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
  movementValue
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
      <CardBody p={{ base: "12px", sm: "14px", md: "16px", lg: "35px" }}>
        <Center>
          <Stat size={["xs", "sm", "md", "lg"]}>
            <HStack mb={{ base: 1, md: 1, lg: 2 }}>
              <Stack spacing={{ base: 0, md: 1 }}>
                <Text
                  fontWeight="extrabold"
                  fontSize={["xs", "sm", "md", "lg"]}
                >
                  {label}
                </Text>
                <StatHelpText>
                  {currentDateStart.format('MMM DD')} - {currentDateEnd.format('MMM DD')}
                </StatHelpText>
              </Stack>
              <Icon
                as={icon}
                boxSize={{ base: 7, sm: 7, md: 8, lg: 10 }}
                ml={{ base: "2px", md: 2 }}
              />
            </HStack>

            <HStack>
              <StatNumber>
                {previousValue && previousValue.toLocaleString()}
              </StatNumber>
              {movementValue > 0 ? (
                <StatHelpText>
                  <StatArrow type="increase" />
                  {movementValue}%
                </StatHelpText>
              ) : (
                <StatHelpText>
                  <StatArrow type="decrease" />
                  {movementValue}%
                </StatHelpText>
              )}
            </HStack>

            <StatHelpText mb={{ base: 0, md: 1, lg: 2 }}>
              {currentValue && currentValue.toLocaleString()} : 
              {previousDateStart.format('MMM DD')} - {previousDateEnd.format('MMM DD')}
            </StatHelpText>
          </Stat>
        </Center>
      </CardBody> 
    </Card>
  );
};
