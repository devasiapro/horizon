import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { Pagination } from '../components/Pagination';
import { useQuery } from '../hooks/useQuery';

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isInitialRun, setIsInitialRun] = useState(true);
  const navigate = useNavigate();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;
  const query = useQuery();

  const isoFormatToHuman = (origDate) => {
    return moment(origDate).utc().format('MMM Do, YYYY');
  };

  const onPageChange = async (newPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customer?page=${page}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCustomers(response.data.items); 
      setPageCount(response.data.pages);
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  useEffect(() => {
    setPage(query.get('page') ? parseInt(query.get('page')) : 1);
    console.log('page', page);
  }, []);

  useEffect(() => {
      console.log('page', page);
      if (page <= 0 || !isInitialRun) {
        return;
      }
      setIsInitialRun(false);
      onPageChange(page);
  }, [page]);

  return (
    <Box p={{ base: 2, md: 4, lg: 6 }}>
      <Flex mb="20px" gap="2">
        <Heading as="h3" size="lg" mb={4}>
          Customers
        </Heading>
        <Button
          onClick={() => navigate('/customer/add?wallet_type=transfer&step=1')}
          size="md"
          type="button"
          colorScheme="horizon"
        >
          <AddIcon /> Transfer
        </Button>
        <Button
          onClick={() => navigate('/customer/add?wallet_type=seamless&step=1')}
          mr="20px"
          size="md"
          type="button"
          colorScheme="horizon"
        >
          <AddIcon /> Seamless
        </Button>
      </Flex>
      <SimpleGrid>
        <Pagination cb={onPageChange} setPage={setPage} page={page} pages={pageCount} />
        <TableContainer
          bg="white"
          mb="10px"
          mt="10px"
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
                  Integeration
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Contract
                </Th>
              </Tr>
            </Thead>
            <Tbody>
            {customers && customers.map(customer => {
              return (
                <Tr key={customer.id}>
                  <Td>
                    <Link onClick={() => navigate(`/customer/${customer.id}`)}>
                      <b>{customer.brand_name}</b>
                    </Link>
                  </Td>
                  <Td>
                    {customer.instance ?? 'Not Available'}
                  </Td>
                  <Td>
                    {customer.wallet_type}
                  </Td>
                  <Td>
                    {customer.currencies.map(currency => currency.name).toString()}
                  </Td>
                  <Td>
                    {isoFormatToHuman(customer.date_added)}
                  </Td>
                  <Td>
                    -
                  </Td>
                  <Td>
                    -
                  </Td>
                </Tr>
              );
            })}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination cb={onPageChange} setPage={setPage} page={page} pages={pageCount} />
      </SimpleGrid>
    </Box>
  );
};
