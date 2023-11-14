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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomerAddSeamlessStep } from '../components/CustomerAddSeamlessStep';
import { FormSeamlessContext } from '../context/FormSeamlessContext';
import { useAuthHook } from "../hooks/useAuthHook";

export const CustomerAddSeamlessProductionDetails = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [isFormComplete, setIsFormComplete] = useState(true);

  const useAuth = useAuthHook();
  const navigate = useNavigate();
  
  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=seamless&step=3');
  };

  const cleanValues = (arr: string[]) => {
    return arr.map(element => {
      return element.trim();
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const token = useAuth.getAuth().token;
    const regulations = formSeamless.regulations ? 
      cleanValues(formSeamless.regulations.split(',')) : 
      [];
    const marketJurisdiction = formSeamless.market_jurisdiction ? 
      cleanValues(formSeamless.market_jurisdiction.split(',')) :
      [];
    const licenses = formSeamless.license ? cleanValues(formSeamless.license.split(',')) : [];
    const officeIps = formSeamless.office_ips ? 
      cleanValues(formSeamless.office_ips.split(',')) : 
      [];
    const languages = formSeamless.language_used ? 
      cleanValues(formSeamless.language_used.split(',')) : 
      [];
    const currencies = formSeamless.currencies ? 
      cleanValues(formSeamless.currencies.split(',')) : 
      [];

    const testAccountStagings = formSeamless.test_account_stagings.split(',').map(accounts => {
      return cleanValues(accounts.split('/'));
    }).map(account => {
      return {
        username: account[0],
        password: account[1]
      };
    });

    const testAccountProductions = formSeamless.test_account_productions.split(',').map(accounts => {
      return cleanValues(accounts.split('/'));
    }).map(account => {
      return {
        username: account[0],
        password: account[1]
      };
    });
     
    const payload = {
      wallet_type: 'seamless',
      merchant_english_name: formSeamless.merchant_english_name,
      brand_name: formSeamless.brand_name,
      regulations: regulations,
      market_jurisdiction: marketJurisdiction,
      licenses: licenses,
      office_ips: officeIps,
      languages_used: languages,
      currencies_used: currencies,
      default_currency: formSeamless.default_currency,
      business_contact: formSeamless.business_contact,
      billing_contact: formSeamless.billing_contact,
      technical_contact: formSeamless.technical_contact,
      customer_contact: formSeamless.customer_contact,
      maintainer_contact: formSeamless.maintainer_contact,
      company_contact: formSeamless.company_contact,
      production_desktop_lobby_url: formSeamless.production_desktop_lobby_url,
      production_mobile_lobby_url: formSeamless.production_mobile_lobby_url,
      test_account_productions: testAccountProductions, 
      production_wallet_endpoint: formSeamless.production_wallet_endpoint, 
      production_wallet_ip_port: formSeamless.production_wallet_ip_port,
      production_service_api_ip: formSeamless.production_service_api_ip,
      staging_desktop_lobby_url: formSeamless.staging_desktop_lobby_url,
      staging_mobile_lobby_url: formSeamless.staging_mobile_lobby_url,
      test_account_stagings: testAccountStagings, 
      staging_wallet_endpoint: formSeamless.staging_wallet_endpoint, 
      staging_wallet_ip_port: formSeamless.staging_wallet_ip_port,
      staging_service_api_ip: formSeamless.staging_service_api_ip
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer/seamless`, 
        payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      setFormSeamless({
        merchant_english_name: '',
        brand_name: '',
        regulations: '',
        market_jurisdiction: '',
        licenses: '',
        office_ips: '',
        language_used: '',
        currencies_used: '',
        default_currency: '',
        business_contact: '',
        billing_contact: '',
        technical_contact: '',
        customer_contact: '',
        maintainer_contact: '',
        company_contact: '',
        production_desktop_lobby_url: '',
        production_mobile_lobby_url: '',
        test_account_productions: '', 
        production_wallet_endpoint: '', 
        production_wallet_ip_port: '',
        production_service_api_ip: '',
        staging_desktop_lobby_url: '',
        staging_mobile_lobby_url: '',
        test_account_stagings: '', 
        staging_wallet_endpoint: '', 
        staging_wallet_ip_port: '',
        staging_service_api_ip: ''
      });
      navigate('/customer/add?wallet_type=seamless&step=5');
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  useEffect(() => {
    const isComplete = formSeamless.production_desktop_lobby_url &&
      formSeamless.production_mobile_lobby_url &&
      formSeamless.test_account_productions &&
      formSeamless.production_wallet_endpoint &&
      formSeamless.production_wallet_ip_port &&
      formSeamless.production_service_api_ip;
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
            <Heading size={["sm", "md", "lg"]}>PRODUCTION DETAILS</Heading>
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
                    production_desktop_lobby_url: e.target.value,
                  })
                }
                name="desktopURL"
                value={formSeamless.production_desktop_lobby_url}
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
                    production_mobile_lobby_url: e.target.value,
                  })
                }
                name="mobileURL"
                value={formSeamless.production_mobile_lobby_url}
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
                    test_account_productions: e.target.value,
                  })
                }
                name="testAccounts"
                value={formSeamless.test_account_productions}
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
                    production_wallet_endpoint: e.target.value,
                  })
                }
                name="walletEndpoint"
                value={formSeamless.production_wallet_endpoint}
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
                    production_wallet_ip_port: e.target.value,
                  })
                }
                name="walletIpPort"
                value={formSeamless.production_wallet_ip_port}
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
                    production_service_api_ip: e.target.value,
                  })
                }
                name="serviceApiIp"
                value={formSeamless.production_service_api_ip}
              />

              <Flex>
                <Button
                  mt={4}
                  type="button"
                  colorScheme="horizon"
                  onClick={(e) => onClickPrevious()}
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
                    onClick={(e) => onSubmit(e)}
                    isDisabled={!isFormComplete}
                  >
                    Submit
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
