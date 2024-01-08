import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import { BsChevronDoubleRight, BsCaretDownFill } from "react-icons/bs";
import styles from "../../public/css/Table.module.css";
import { useAuthHook } from '../hooks/useAuthHook';

export const IncomePerCategory = ({ 
  currentDateStart,
  currentDateEnd,
  previousDateStart,
  previousDateEnd,
  filter,
  setIsProcessing
}) => {
  const [topData, setTopData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const navigate = useNavigate();

  const computeMovement = (current, previous) => {
    if (current + previous === 0) {
      return 0;
    }
    return ((current - previous) / ((current + previous) / 2 )) * 100
  };

  const fetchReport = async (dateStart, dateEnd) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/report/rank`, {
          params: {
            start_date: dateStart.format('YYYY-MM-DD'),
            end_date: dateEnd.format('YYYY-MM-DD'),
            category: filter,
            indicator: 'ggr',
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    ); 
    return Promise.resolve(response);
  };

  const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  const process = async () => {
    try {
      setIsLoading(true);
      setIsProcessing(true);
      const responses = await Promise.all([
        fetchReport(previousDateStart, previousDateEnd),
        fetchReport(currentDateStart, currentDateEnd)
      ]);
      const previousCategories = responses[0].data;
      const currentCategories = responses[1].data;
      const tempArr = [];
      for (const key in currentCategories) {
        const previousCategory = previousCategories[key] ? previousCategories[key] : 0;
        tempArr.push({
          category: truncate(key, 32),
          current: currentCategories[key],
          previous: previousCategory,
          growth: computeMovement(currentCategories[key], previousCategories[key]),
        });
      }
      tempArr.sort((a, b) => b.current - a.current);
      setSortedData(tempArr.splice(0, 15));
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const onClick = (element) => {
    if (filter != 'customer') {
      return;
    }
    window.open(`/customer/12`, "_blank", "noreferrer");
  };

  useEffect(() => {
    process();
  }, [filter]);

  useEffect(() => {
    process();
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Skeleton isLoaded={!isLoading}>
          <Card p={0} variant={"unstyled"}>
            <CardBody p={0}>
              <Box mt={3} mb={5} px={4}>
                <Flex>
                  <Heading size="md" color={"horizon.300"}>
                    GGR per {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
                          onClick={(ev) => {onClick(element)}}
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
        </Skeleton>
      </Box>
    </React.Fragment>
  );
};
