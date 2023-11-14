import React, { useState, useContext, useEffect } from 'react';
import {
  Show,
  Text,
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
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Spacer,
  Tooltip
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CustomerAddSeamlessStep } from '../components/CustomerAddSeamlessStep';
import { FormSeamlessContext } from '../context/FormSeamlessContext';

export const CustomerAddSeamlessStagingDetails = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [isFormComplete, setIsFormComplete] = useState(true);

  const navigate = useNavigate();
  
  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=seamless&step=2');
  };

  const onClickNext = () => {
    navigate('/customer/add?wallet_type=seamless&step=4');
  };

  useEffect(() => {
    const isComplete = formSeamless.staging_desktop_lobby_url &&
      formSeamless.staging_mobile_lobby_url &&
      formSeamless.test_account_stagings &&
      formSeamless.staging_wallet_endpoint &&
      formSeamless.staging_wallet_ip_port &&
      formSeamless.staging_service_api_ip;
    setIsFormComplete(isComplete);
  }, [formSeamless]);
  
  return (
    <React.Fragment>
      <CustomerAddSeamlessStep step={step} />

      <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
        <Card borderRadius={"8px"}>
          <CardHeader
            pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
            color={"horizon.300"}
          >
            <Heading size={["sm", "md", "lg"]}>STAGING DETAILS</Heading>
          </CardHeader>

          <CardBody color={"horizon.300"}>
            <form>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Desktop Lobby / Portral URL
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    staging_desktop_lobby_url: e.target.value,
                  })
                }
                name="desktopURL"
                value={formSeamless.staging_desktop_lobby_url}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Mobile Lobby / Portral URL
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    staging_mobile_lobby_url: e.target.value,
                  })
                }
                name="mobileURL"
                value={formSeamless.staging_mobile_lobby_url}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Test Accounts
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    test_account_stagings: e.target.value,
                  })
                }
                name="testAccounts"
                value={formSeamless.test_account_stagings}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Wallet Endpoint
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    staging_wallet_endpoint: e.target.value,
                  })
                }
                name="walletEndpoint"
                value={formSeamless.staging_wallet_endpoint}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Wallet IP and Port
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    staging_wallet_ip_port: e.target.value,
                  })
                }
                name="walletIpPort"
                value={formSeamless.staging_wallet_ip_port}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Service API IP  
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    staging_service_api_ip: e.target.value,
                  })
                }
                name="serviceApiIp"
                value={formSeamless.staging_service_api_ip}
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
                  isDisabled={isFormComplete}
                >
                  <Button
                    mt={4}
                    type="button"
                    colorScheme="horizon"
                    onClick={(e) => onClickNext()}
                    isDisabled={!isFormComplete}
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
