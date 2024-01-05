import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  SimpleGrid,
  Skeleton,
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
import { CustomerPerformanceView } from '../components/CustomerPerformanceView';

export const CustomerView = () => {
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
    },
    contacts: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const customerId = params.customerId;

  const yesterday = moment().subtract(1, 'days');
  const weekBefore = moment().subtract(8, 'days');

  const currentDateStart = yesterday.clone().weekday(0).format('YYYY-MM-DD');
  const currentDateEnd = yesterday.format('YYYY-MM-DD');
  const currentMonthStart = moment().startOf('month').format('YYYY-MM-DD');;

  const previousDateStart = weekBefore.clone().weekday(0).format('YYYY-MM-DD');
  const previousDateEnd = weekBefore.format('YYYY-MM-DD');
  const previousMonthStart = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');

  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  const fetchCustomerInfo = async () => {
    try {
      setIsLoading(true);
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
        contacts: customerModel.contacts
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
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
          currentDateStart={yesterday.clone().weekday(0)}
          currentDateEnd={yesterday}
          previousDateStart={weekBefore.clone().weekday(0)}
          previousDateEnd={weekBefore}
        />
      </Box>

      <Box bg={"white"}>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab>General Information</Tab>
            <Tab>Performance</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Skeleton isLoaded={!isLoading}>
                <CustomerGeneralInformationView 
                  setCustomer={setCustomer} 
                  customer={customer} 
                />
              </Skeleton>
            </TabPanel>
            <TabPanel>
              <CustomerPerformanceView 
                customer={customer} 
              />
            </TabPanel>
          </TabPanels>
        </Tabs> 
      </Box>
    </Container>    
  );
};
