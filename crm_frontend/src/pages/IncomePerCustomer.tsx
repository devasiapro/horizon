import React from 'react';
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

export const IncomePerCustomer = ({ topData, yesterday, weekBefore, filter }) => {
  return (
    <React.Fragment>
      <Box>
        <Card p={0} variant={"unstyled"}>
          <CardBody p={0}>
            <Box mt={3} mb={5} px={5}>
              <Flex>
                <Heading size="md" color={"horizon.300"}>
                  Income per {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Heading>
              </Flex>
              <Flex mt="20px">
                <HStack spacing={1} color={"horizon.300"}>
                  <Text fontSize={"14px"} fontWeight={"800"}>
                    Last Week: {weekBefore.clone().weekday(0).format('MMM DD, YYYY')} - {weekBefore.format('MMM DD, YYYY')}
                  </Text>
                  <Divider orientation="vertical" ml="20px" mr="20px" />
                  <Text fontSize={"14px"} fontWeight={"800"}>
                    Current Week: {yesterday.clone().weekday(0).format('MMM DD, YYYY')} - {yesterday.format('MMM DD, YYYY')}
                  </Text>
                </HStack>
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
                  {topData.map((topElement, index) => {
                    const isOddIndex = index % 2 !== 1;
                    return (
                      <Tr
                        key={topElement.name}
                        py={0}
                        m={0}
                        // px={3}
                        className={isOddIndex && styles.striped}
                        cursor={"pointer"}
                        _hover={{ bg: "#ECF1E3" }}
                      >
                        <Td justifyItems={"center"}>{topElement.name}</Td>

                        <Td isNumeric>
                          {parseFloat(topElement.last_total_earnings)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Td>
                        <Td isNumeric>
                          {parseFloat(topElement.current_total_earnings)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Td>
                        <Td isNumeric>
                          <Flex>
                            {parseFloat(topElement.growth)
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%"}
                            {topElement.growth <= 0 ? (
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
