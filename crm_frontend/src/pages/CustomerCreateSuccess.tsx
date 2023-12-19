import { useState } from 'react';
import { 
  Image,
  Text,
  Center,
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Heading,
  Spacer,
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Stack
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from 'axios';

import { StockFormButton } from '../components/StockFormButton';
import { OutlineFormButton } from '../components/OutlineFormButton';

export const CustomerCreateSuccess = () => {
  const navigate = useNavigate();

  return (
    <Flex mt={20} mb={20}>
      <Spacer flex='1' />
      <Box flex='2'>
        <Card>
          <CardBody>
            <Flex justifyContent="center">
              <Image src="/images/check_big.svg" />
            </Flex>
            <Center mt="30px">            
              <Heading as="h2" size="xl" color="#374A16">SUCCESS!</Heading>
            </Center>            
            <Center>
              <Text fontSize="lg">The Form was submitted successfully!</Text>
            </Center>
            <Stack mt="40px" direction="row" spacing={4} justifyContent="end">
              <OutlineFormButton 
                label={"Back to Customers"}
                onClick={(e) => navigate('/customer')}
              />
              <StockFormButton 
                label={"Create another one"}
                onClick={(e) => navigate('/customer/create')}
              />
            </Stack>
          </CardBody>
        </Card>
      </Box>
      <Spacer flex='1' />
    </Flex>
  );
};
