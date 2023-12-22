import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Container,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Select,
  Skeleton,
  useToast
} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { StockInputFile } from '../components/StockInputFile';

export const CustomerIntegration = () => {
  const [integrationStatuses, setIntegrationStatuses] = useState([]);
  const [integrationStatusId, setIntegrationStatusId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsIntialLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const toast = useToast()

  const customerId = params.customerId;

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/customer/${customerId}/integration`, {
            integration_status_id: integrationStatusId
          }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'Customer Integration',
        description: 'Customer integration status was successfully updated.',
        status: 'success',
        duration: 10000,
        isClosable: true
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = async () => {
    navigate(`/customer`);
  };

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customer/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
      ); 
      setIntegrationStatusId(response.data.integration_status_id);
    } catch (err) {
      console.log('err', err);
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
      setIntegrationStatuses(response.data); 
    } catch (err) {
      console.log('err', err);
    } finally {

    } 
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsIntialLoading(true);
        await fetchIntegrationStatuses();
        await fetchCustomer();
      } catch (err) {

      } finally {
        setIsIntialLoading(false);
      }
    };
    init();
  }, []);

  return (
    <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
      <Card borderRadius={"8px"}>
        <CardHeader
          pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
          color={"horizon.300"}
        >
          <Heading size={["sm", "md", "lg"]}>INTEGRATION STATUS</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={() => onSubmit()}>
            <FormControl mb={3} variant={"horizon"}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>Status</FormLabel>
              <Skeleton isLoaded={!isInitialLoading}>
                <Select value={integrationStatusId} onChange={(ev) => setIntegrationStatusId(ev.target.value)}>
                  {integrationStatuses.map(integrationStatus => {
                    return (
                      <option 
                        key={integrationStatus.id} 
                        value={integrationStatus.id} 
                      >
                        {integrationStatus.name}
                      </option>
                    )
                  })}
                </Select>
              </Skeleton>
            </FormControl>
            <Flex mt="40px">
              <StockFormButton label={"Back"} onClick={(e) => onBack()}/>
              <Spacer />
              <StockFormButton 
                isLoading={isLoading}
                label={"Update"}
                toolTipText={"Complete all fields in order to continue"} 
                isEnabled={true}
                onClick={(e) => onSubmit()}
              />
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};
