import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  Flex,
  Spacer,
  HStack,
  VStack,
  Skeleton,
  StatArrow,
  Stat,
} from "@chakra-ui/react";
import { BsChevronDoubleRight, BsCaretDownFill } from "react-icons/bs";
import styles from "../../public/css/Table.module.css";

export const IncomePerCategory = ({ 
  gameSessions, 
  currentMonth, 
  lastMonth, 
  filter 
}) => {
  const [topData, setTopData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const computeMovement = (current, previous) => {
    return ((current - previous) / ((current + previous) / 2 )) * 100
  };

  const initializeCategories = (gameSessions) => {
    const categories = {};
    gameSessions.current.forEach((gameSession) => {
      categories[gameSession.player.countryName] = {
        previous: 0,
        current: 0,
        growth: 0
      };
    });
    gameSessions.previous.forEach((gameSession) => {
      categories[gameSession.player.countryName] = {
        previous: 0,
        current: 0,
        growth: 0
      };
    });
    return categories;
  };

  useEffect(() => {
    const categories = initializeCategories(gameSessions);
    
    gameSessions.current.forEach((gameSession) => {
      categories[gameSession.player.countryName].current += Number(gameSession.totalIncome);
    });
    gameSessions.previous.forEach((gameSession) => {
      categories[gameSession.player.countryName].previous += Number(gameSession.totalIncome);
    });
    console.log('gameSessions', gameSessions);
    const tempArr = [];
    for (const key in categories) {
      tempArr.push({
        category: key,
        current: categories[key].current,
        previous: categories[key].previous,
        growth: computeMovement(categories[key].current, categories[key].previous),
      });
      tempArr.sort((a, b) => a.current - b.current);
    }
    setSortedData(tempArr);
  }, [gameSessions]);

  return (
    <React.Fragment>
      <Box>
        <Card p={0} variant={"unstyled"}>
          <CardBody p={0}>
            <Box mt={3} mb={5} px={4}>
              <Flex>
                <Heading size="md" color={"horizon.300"}>
                  Income per {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Heading>
              </Flex>
            </Box>
            <TableContainer size="sm" mt={0}>
              <Table
                size="sm"
                variant="dashboard"
                color={"horizon.300"}
                colorScheme="horizon"
              >
                <Thead p={0} m={0}>
                  <Tr>
                    <Th fontSize={"14px"}>
                      <Flex>
                        {filter}
                        <BsCaretDownFill
                          cursor={"pointer"}
                          color="horizon.300"
                        />
                      </Flex>
                    </Th>
                    <Th fontSize={"14px"}>
                      <Flex>
                        Last Week{" "}
                        <BsCaretDownFill
                          cursor={"pointer"}
                          color="horizon.300"
                        />
                      </Flex>
                    </Th>
                    <Th fontSize={"14px"}>
                      <Flex>
                        Current Week{" "}
                        <BsCaretDownFill
                          cursor={"pointer"}
                          color="horizon.300"
                        />
                      </Flex>
                    </Th>
                    <Th fontSize={"14px"}>
                      <Flex>
                        Movement{" "}
                        <BsCaretDownFill
                          cursor={"pointer"}
                          color="horizon.300"
                        />
                      </Flex>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody p={0} m={0}>
                  {sortedData.map((element, index) => {
                    const isOddIndex = index % 2 !== 1;
                    return (
                      <Tr
                        key={element.category}
                        py={0}
                        m={0}
                        className={isOddIndex && styles.striped}
                        cursor={"pointer"}
                        _hover={{ bg: "#ECF1E3" }}
                      >
                        <Td justifyItems={"center"}>{element.category}</Td>

                        <Td isNumeric>
                          {parseFloat(element.previous)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Td>
                        <Td isNumeric>
                          {parseFloat(element.current)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Td>
                        <Td isNumeric>
                          <Flex>
                            {parseFloat(element.growth)
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%"}
                            {element.growth <= 0 ? (
                              <Stat ml={1}>
                                <StatArrow
                                  type="decrease"
                                  color={"horizon.200"}
                                />
                              </Stat>
                            ) : (
                              <Stat ml={1}>
                                <StatArrow
                                  type="increase"
                                  color={"horizon.200"}
                                />
                              </Stat>
                            )}
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </React.Fragment>
  );
};
