import React, { useState, useContext, useEffect } from 'react';
import { 
  Show,
  Spacer,
  Flex,
  Text,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Container,
  Box ,
  FormControl,
  FormHelperText,
  FormLabel,
  Tooltip,
  Button
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { CustomerEditSeamlessStep } from '../components/CustomerEditSeamlessStep';
import { FormSeamlessContext } from '../context/FormSeamlessContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerEditSeamlessStagingDetails = ({ customerId, step }) => {
  const { formSeamless, setFormSeamless } = useContext(FormSeamlessContext);
  const [ isFormComplete, setIsFormComplete ] = useState(false);

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=4`);
  };

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=2`);
  };

  useEffect(() => {
    const isComplete = formSeamless.staging_desktop_lobby_url &&
      formSeamless.staging_mobile_lobby_url &&
      formSeamless.test_account_stagings &&
      formSeamless.staging_wallet_endpoint &&
      formSeamless.staging_wallet_ip_port &&
      formSeamless.staging_service_api_ip;
    setIsFormComplete(isComplete);
  }, []);

  useEffect(() => {
    const isComplete = formSeamless.staging_desktop_lobby_url &&
      formSeamless.staging_mobile_lobby_url &&
      formSeamless.test_account_stagings &&
      formSeamless.staging_wallet_endpoint &&
      formSeamless.staging_wallet_ip_port &&
      formSeamless.staging_service_api_ip;
    setIsFormComplete(isComplete);
  }, [ formSeamless ]);
  
  return (
    <React.Fragment>
      <CustomerEditSeamlessStep step={step} />
      <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
        <Card borderRadius={"8px"}>
          <CardHeader
            pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
            color={"horizon.300"}
          >
            <Heading size={["sm", "md", "lg"]}>EDIT STAGING DETAILS</Heading>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <StockInputText 
                label={"Desktop Lobby/Portal URL"} 
                formName={"desktopLobby"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_desktop_lobby_url: e.target.value
                  })
                }}
                value={formSeamless.staging_desktop_lobby_url}
              />
              <StockInputText 
                label={"Mobile Lobby/Portal URL"} 
                formName={"mobileLobby"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_mobile_lobby_url: e.target.value
                  })
                }}
                value={formSeamless.staging_mobile_lobby_url}
              />
              <StockInputText 
                label={"Test Accounts"} 
                formName={"testAccountStagings"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    test_account_stagings: e.target.value
                  })
                }}
                value={formSeamless.test_account_stagings}
              />
              <StockInputText 
                label={"Wallet Endpoint"} 
                formName={"Wallet Endpoint"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_wallet_endpoint: e.target.value
                  })
                }}
                value={formSeamless.staging_wallet_endpoint}
              />
              <StockInputText 
                label={"Wallet IP and Port"} 
                formName={"stagingWalletIPPort"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_wallet_ip_port: e.target.value
                  })
                }}
                value={formSeamless.staging_wallet_ip_port}
              />
              <StockInputText 
                label={"Service API IP"} 
                formName={"stagingServiceApiIp"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_service_api_ip: e.target.value
                  })
                }}
                value={formSeamless.staging_service_api_ip}
              />
              <Flex>
                <StockFormButton 
                  isEnabled={true}
                  label={"Previous"}
                  onClick={(e) => onClickPrevious()}
                />
                <Spacer />
                <StockFormButton 
                  toolTipText={"Complete all fields in order to continue"} 
                  label={"Next"}
                  isEnabled={isFormComplete}
                  onClick={(e) => onClickNext()}
                />
              </Flex>
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
