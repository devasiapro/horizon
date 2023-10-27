import React from 'react';
import {
  Flex,
  Spacer,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Link,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'


export const CustomerList = () => {
  return (
    <Box p={{ base: 2, md: 4, lg: 6 }}>
      <Flex mb="20px" gap="2">
        <Heading as="h3" size="lg" mb={4}>
          Customers
        </Heading>
        <Button
          size="md"
          type="button"
          colorScheme="horizon"
        >
          <AddIcon /> Transfer
        </Button>
        <Button
          mr="20px"
          size="md"
          type="button"
          colorScheme="horizon"
        >
          <AddIcon /> Seamless
        </Button>
      </Flex>
      <SimpleGrid>
        <TableContainer
          bg="white"
          borderRadius={"8px"}
          shadow={2}
          overflowX="auto"
        >
          <Table>
            <Thead bg={"horizon.300"}>
              <Tr>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Brand Name
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Instance
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Wallet Type
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Currency
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Date Added
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Status
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Contract
                </Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </Box>
  );
};
