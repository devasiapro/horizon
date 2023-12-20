import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  SimpleGrid,
  Heading,
  Box,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';

import { useAuthHook } from '../hooks/useAuthHook';
import { KPIContainerCustomer } from '../components/KPIContainerCustomer';
import { CustomerGeneralInformationView } from '../components/CustomerGeneralInformationView';

export const CustomerView = () => {
  const [gameSessions, setGameSessions] = useState({
    current: [],
    previous: []
  });
  const [customer, setCustomer] = useState({
    brandName: '',
    parent: {
      brandName: '',
      contactPerson: '',
      email: '',
      id: 0,
      skypeGroup: '' 
    },
    walletType: {
      id: 0,
      name: ''
    },
    instance: {
      id: 0,
      name: ''
    }
  });

  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;
  const customerId = params.customerId;

  const yesterday = moment().subtract(1, 'days');
  const weekBefore = moment().subtract(8, 'days');

  const currentDateStart = yesterday.clone().weekday(0).format('YYYY-MM-DD');
  const currentDateEnd = yesterday.format('YYYY-MM-DD');
  const previousDateStart = weekBefore.clone().weekday(0).format('YYYY-MM-DD');
  const previousDateEnd = weekBefore.format('YYYY-MM-DD');

  useEffect(() => {
    const init = async () => {
      fetchCustomerInfo();
      try {
        const responses = await Promise.all([
          fetchCustomerReport(customerId, currentDateStart, currentDateEnd),
          fetchCustomerReport(customerId, previousDateStart, previousDateEnd)
        ]);
        console.log('responses', responses);
        setGameSessions({
          current: responses[0],
          previous: responses[1]
        });
      } catch (err) {
          console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  const fetchCustomerInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customer/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
      ); 
      const customerModel = response.data;
      setCustomer({
        ...customerModel,
        parent: customerModel.parent ? customerModel.parent : {
          id: 0,
          brandName: ''
        },
        instance: customerModel.instance ? customerModel.instance : {
          id: 0,
          name: ''
        },
        kiosk: customerModel.kiosk ? customerModel.kiosk : {
          id: 0,
          name: ''
        },
      });
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  const fetchCustomerReport = async (customerId, dateStart, dateEnd) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customer/${customerId}/report/ggr`, {
            params: {
              start_date: dateStart,
              end_date: dateEnd
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
      ); 
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {

    }
  };

  return (
    <Container mt="20px" maxW="container.2xl">    
      <Heading color="#374A16">
        {customer.brandName}
      </Heading>
      <SimpleGrid
        spacing={{ base: 2, sm: 3, md: 5 }}
        minChildWidth={{ base: "110px", sm: "150px", md: "180px" }}
      >
      </SimpleGrid>
      <Box
        mb={{ base: 3, sm: 6, md: 7, lg: 6 }}
        mt={{ base: 1, sm: 1, md: 1, lg: 1 }}
      >
        <KPIContainerCustomer
          gameSessions={gameSessions}
          currentDateStart={yesterday.clone().weekday(0)}
          currentDateEnd={yesterday}
          previousDateStart={weekBefore.clone().weekday(0)}
          previousDateEnd={weekBefore}
        />
      </Box>

      <Box bg={"white"}>
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab>General Information</Tab>
            <Tab>Performance</Tab>
            <Tab>Contracts</Tab>
            <Tab>Billing</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CustomerGeneralInformationView setCustomer={setCustomer} customer={customer} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs> 
      </Box>
    </Container>    
  );
};
