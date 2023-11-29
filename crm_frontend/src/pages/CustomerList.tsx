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
  FormLabel
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { Pagination } from '../components/Pagination';
import { useQuery } from '../hooks/useQuery';

export const CustomerList = () => {
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
  const token = useAuth.getAuth().token;
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

        await Promise.all([fetchIntegrationStatuses(), onPageChange()]);
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

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
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Pagination 
            itemLabel={"customers"}
            cb={onPageChange} 
            setPage={setPage} 
            page={page} 
            pages={pageCount} 
            total={total} 
          />
          <Spacer />
          <Box>
            <form onSubmit={(ev) => filter(ev)}>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <CheckboxGroup 
                  colorScheme="green" 
                  defaultValue={walletTypeFilters}
                >
                  <Stack direction={['row']}>
                    <Checkbox 
                      onChange={(ev) => processWalletTypeFilters(ev.target.checked, 'transfer')}
                      value="transfer">
                      Transfer
                    </Checkbox>
                    <Checkbox 
                      onChange={(ev) => processWalletTypeFilters(ev.target.checked, 'seamless')}
                      value="seamless">
                      Seamless
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
                <FormControl mb={3} variant={"horizon"} mr="10px" mt="8px">
                  <Select 
                    value={selectedIntegrationStatus} 
                    onChange={(ev) => setSelectedIntegrationStatus(ev.target.value)} 
                    bg="white"
                  >
                    <option key={0} value={0}>Integration Status (Show All)</option>
                    {integrationStatuses.map(integrationStatus => {
                      return (
                        <option key={integrationStatus.id} value={integrationStatus.id}>
                          {integrationStatus.name}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
                <InputGroup mb={"4px"}>
                  <InputLeftElement pointerEvents={"none"}>
                    <SearchIcon color={"gray.300"} />
                  </InputLeftElement>
                  <Input 
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)} 
                    placeholder="Brand Name" 
                    bg={"white"}
                  />
                </InputGroup>
                <Button
                  onClick={(ev) => filter(ev)}
                  pl={"30px"}
                  pr={"30px"}
                  size="md"
                  type="button"
                  colorScheme="horizon"
                >
                  Search
                </Button>
              </Flex>
            </form>
          </Box>

        </Flex>

        <Skeleton isLoaded={!isLoading}>
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
                  Integration Status
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Contract Status
                </Th>
                <Th
                  color={"white"}
                  fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                >
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
            {customers && customers.map(customer => {
              return (
                <Tr key={customer.id}>
                  <Td>
                    <Link onClick={() => navigate(
                      `/customer/${customer.id}/edit?wallet_type=${customer.wallet_type}&step=1`
                    )}>
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
                    <Button 
                      mt={4}
                      type="button"
                      colorScheme="horizon"
                      onClick={() => navigate(`/customer/${customer.id}/integration`)}
                    >
                      {customer.integration_status ? customer.integration_status.name : 'N/A'}
                    </Button>
                  </Td>
                  <Td>
                    <Button 
                      mt={4}
                      type="button"
                      colorScheme="horizon"
                      onClick={() => navigate(`/customer/${customer.id}/contract`)}
                    >
                      {customer.contract_status ? customer.contract_status.name : 'N/A'}
                    </Button>
                  </Td>
                  <Td>
                    <Button 
                      mt={4}
                      type="button"
                      colorScheme="horizon"
                      onClick={() => navigate(
                        `/customer/${customer.id}/edit?wallet_type=${customer.wallet_type}&step=1`
                      )}>
                      Edit
                    </Button>
                  </Td>
                </Tr>
              );
            })}
            </Tbody>
          </Table>
        </TableContainer>
        </Skeleton>
        <Pagination 
          itemLabel={"customers"}
          cb={onPageChange} 
          setPage={setPage} 
          page={page} 
          pages={pageCount} 
          total={total} 
        />
      </SimpleGrid>
    </Box>
  );
};
