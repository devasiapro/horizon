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
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  CheckboxGroup,
  Stack,
  Checkbox,
  Skeleton,
  SkeletonText,
  Select,
  FormControl,
  FormLabel,
  useDisclosure,
  Card,
  CardBody
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { Pagination } from '../components/Pagination';
import { useQuery } from '../hooks/useQuery';
import { CustomerCreateModal } from '../components/CustomerCreateModal';

export const CustomerList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletTypeFilters, setWalletTypeFilters] = useState(['transfer', 'seamless']);
  const [integrationStatuses, setIntegrationStatuses] = useState([]);
  const [selectedIntegrationStatus, setSelectedIntegrationStatus] = useState(0);

  const navigate = useNavigate();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const query = useQuery();

  const isoFormatToHuman = (origDate) => {
    return moment(origDate).utc().format('MMM Do, YYYY');
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customer`, 
        {
          params: {
            page: page,
            search: search,
            wallet_type: walletTypeFilters,
            integration_status: selectedIntegrationStatus
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response;
    } catch (err) {
      throw err;
    } finally {
    }
  };

  const fetchIntegrationStatuses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/integration-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ); 
      console.log('response', response.data);
      setIntegrationStatuses(response.data); 
    } catch (err) {
      console.log('err', err);
    } finally {

    } 
  };

  const onPageChange = async () => {
    if (page <= 0) return;
    try {
      const response = await fetchCustomers();
      console.log('response', response);
      processResponse(response);
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  const filter = async (ev) => { 
    ev.preventDefault();
    const response = await fetchCustomers();
    setPage(1);
    processResponse(response);
  };

  const processResponse = (response) => {
    console.log('response.data.items', response.data.items);
    setCustomers(response.data.items); 
    setPageCount(response.data.pages);
    setTotal(response.data.total);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    url.searchParams.set('search', search);
    url.searchParams.set('wallet_type', walletTypeFilters);
    url.searchParams.set('integration_status', selectedIntegrationStatus);
    window.history.pushState({}, '', url.toString());
  };

  const processWalletTypeFilters = (isChecked, walletType) => {
    const newFilter = walletTypeFilters.filter(el => el !== walletType);
    if (isChecked) {
      newFilter.push(walletType);
    }
    setWalletTypeFilters(newFilter);
  };

  const openTransferModal = () => {

  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setSearch(query.get('search') ? query.get('search') : '');
        setWalletTypeFilters(
          query.get('wallet_type') ? query.get('wallet_type').split(',') : walletTypeFilters
        );
        setPage(query.get('page') ? parseInt(query.get('page')) : 1);
        setIsLoading(true);

        await Promise.all([onPageChange()]);
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return (
    <Box p={{ base: 2, md: 4, lg: 6 }}>
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem w="100%">
          <Card boxShadow="xl" p="2" bg="#374A16" color="white">
            <CardBody align="center">
              <Heading size="4xl" as="h1">{customers.length}</Heading>
              <Heading size="md" mt="2">Total</Heading>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem w="100%">
        </GridItem>
        <GridItem w="100%">
        </GridItem>
      </Grid>
      <Flex mt="10px" mb="10px" gap="2">
        <Button
          onClick={() => window.open('/customer/create', '_blank')}
          size="md"
          type="button"
          colorScheme="horizon"
        >
          Add New
        </Button>
      </Flex>
      <SimpleGrid>
        <TableContainer
          bg="white"
          mb="10px"
          mt="10px"
          borderRadius={"8px"}
          shadow={2}
          overflowX="auto"
        >
          <Table size={"sm"} minH={"700px"}>
            <Thead bg={"horizon.300"}>
              <Tr>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Operator
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Customer
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Platform
                </Th>
              </Tr>
            </Thead>
            <Tbody>
            {customers && customers.map(customer => {
              return (
                <Tr key={customer.id}>
                  <Td>
                    <Link onClick={() => window.open(
                      `/customer/${customer.id}`
                    , '_blank').focus()}>
                      <b>{customer.brandName}</b>
                    </Link>
                  </Td>
                  <Td>
                    {customer.parent ? customer.parent.brandName : 'NA'}
                  </Td>
                  <Td>
                    {customer.walletType.name}
                  </Td>
                </Tr>
              );
            })}
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
      <CustomerCreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
