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
  const [ errors, setErrors ] = useState({
    stagingDesktopLobbyUrl: '',
    stagingMobileLobbyUrl: '',
    testAccounts: '',
    walletEndpoint: '',
    walletIpPort: ''
  });

  const navigate = useNavigate();

  const onClickNext = () => {
    let isError = false;
    let tempErrors = {
      stagingDesktopLobbyUrl: '',
      stagingMobileLobbyUrl: '',
      testAccounts: '',
      walletEndpoint: '',
      walletIpPort: '',
      serviceApiIp: ''
    };

    if (!formSeamless.staging_desktop_lobby_url) {
      tempErrors = {...tempErrors, stagingDesktopLobbyUrl: 'Desktop Lobby URL is required.'};
      isError = true;
    }

    if (!formSeamless.staging_mobile_lobby_url) {
      tempErrors = {...tempErrors, stagingMobileLobbyUrl: 'Mobile Lobby URL is required.'};
      isError = true;
    }
  
    if (!formSeamless.test_account_stagings) {
      tempErrors = {...tempErrors, testAccounts: 'Test Accounts is required.'};
      isError = true;
    }

    if (!formSeamless.staging_wallet_endpoint) {
      tempErrors = {...tempErrors, walletEndpoint: 'Wallet Endpoint is required.'};
      isError = true;
    }

    if (!formSeamless.staging_wallet_ip_port) {
      tempErrors = {...tempErrors, walletIpPort: 'Wallet IP and Port is required.'};
      isError = true;
    }

    if (!formSeamless.staging_service_api_ip) {
      tempErrors = {...tempErrors, serviceApiIp: 'Service API and API is required.'};
      isError = true;
    }

    setErrors(tempErrors);
    if (!isError) {
      navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=4`);
    }
  };

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=2`);
  };

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
            <Text fontSize="sm">Required *</Text>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <StockInputText 
                label={"Desktop Lobby / Portal URL *"} 
                formName={"desktopLobbyUrl"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_desktop_lobby_url: e.target.value
                  })
                }}
                errorMessage={errors.stagingDesktopLobbyUrl}
                value={formSeamless.staging_desktop_lobby_url}
                placeholder={"e.g. https://desktop.com/lobby"}
                helperText={""}
              />

              <StockInputText 
                label={"Mobile Lobby / Portal URL *"} 
                formName={"mobileLobbyUrl"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_mobile_lobby_url: e.target.value
                  })
                }}
                errorMessage={errors.stagingMobileLobbyUrl}
                value={formSeamless.staging_mobile_lobby_url}
                placeholder={"e.g. https://mobile.com/lobby"}
                helperText={""}
              />

              <StockInputText 
                label={"Test Accounts *"} 
                formName={"testAccounts"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    test_account_stagings: e.target.value
                  })
                }}
                errorMessage={errors.testAccounts}
                value={formSeamless.test_account_stagings}
                placeholder={"e.g. user/mypassword, user2/otherpassword"}
                helperText={"Seperated by slash (username/password) and comma"}
              />

              <StockInputText 
                label={"Wallet Endpoint *"} 
                formName={"walletEndpoint"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_wallet_endpoint: e.target.value
                  })
                }}
                errorMessage={errors.walletEndpoint}
                value={formSeamless.staging_wallet_endpoint}
                placeholder={"e.g. https://casino.com/wallet"}
              />

              <StockInputText 
                label={"Wallet IP and Port *"} 
                formName={"walletIpPort"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_wallet_ip_port: e.target.value
                  })
                }}
                errorMessage={errors.walletIpPort}
                value={formSeamless.staging_wallet_ip_port}
                placeholder={"e.g. 123.231.324.123:80"}
              />

              <StockInputText 
                label={"Service API IP *"} 
                formName={"serviceApiIp"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    staging_service_api_ip: e.target.value
                  })
                }}
                errorMessage={errors.serviceApiIp}
                value={formSeamless.staging_service_api_ip}
                placeholder={"e.g. 421.232.211.111"}
              />

              <Flex>
                <Button
                  mt={4}
                  type="button"
                  colorScheme="horizon"
                  onClick={(e) => {
                    onClickPrevious();
                  }}
                >
                  Previous
                </Button>
                <Spacer />
                <Tooltip
                  hasArrow
                  label="Complete all fields in order to continue"
                  borderRadius={"20px"}
                >
                  <Button
                    mt={4}
                    type="button"
                    colorScheme="horizon"
                    onClick={(e) => onClickNext()}
                  >
                    Next
                  </Button>
                </Tooltip>
              </Flex>
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
