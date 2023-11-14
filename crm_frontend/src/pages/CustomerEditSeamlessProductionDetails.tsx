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
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';
import { CustomerEditSeamlessStep } from '../components/CustomerEditSeamlessStep';
import { FormSeamlessContext } from '../context/FormSeamlessContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerEditSeamlessProductionDetails = ({ customerId, step }) => {
  const { formSeamless, setFormSeamless } = useContext(FormSeamlessContext);
  const [ isFormComplete, setIsFormComplete ] = useState(false);

  const useAuth = useAuthHook();
  const navigate = useNavigate();

  const cleanValues = (arr: string[]) => {
    return arr.map(element => {
      return element.trim();
    });
  };

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=3`);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    console.log(formSeamless.test_account_stagings);
    const token = useAuth.getAuth().token;

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
      merchant_english_name: formSeamless.merchant_english_name,
      brand_name: formSeamless.brand_name,
      regulations: formSeamless.regulations ? cleanValues(formSeamless.regulations.split(',')) : [],
      market_jurisdiction: formSeamless.market_jurisdiction ? cleanValues(formSeamless.market_jurisdiction.split(',')) : [],
      licenses: formSeamless.licenses ? cleanValues(formSeamless.licenses.split(',')) : [],
      office_ips: formSeamless.office_ips ? cleanValues(formSeamless.office_ips.split(',')) : [],
      languages_used: formSeamless.language_used ? cleanValues(formSeamless.language_used.split(',')) : [],
      currencies_used: formSeamless.currencies_used ? cleanValues(formSeamless.currencies_used.split(',')) : [],
      default_currency: formSeamless.default_currency,
      business_contact: formSeamless.business_contact,
      billing_contact: formSeamless.billing_contact,
      technical_contact: formSeamless.technical_contact,
      customer_contact: formSeamless.customer_contact,
      maintainer_contact: formSeamless.maintainer_contact,
      company_contact: formSeamless.company_contact,
      staging_desktop_lobby_url: formSeamless.staging_desktop_lobby_url,  
      staging_mobile_lobby_url: formSeamless.staging_mobile_lobby_url,
      test_account_stagings: testAccountStagings,
      staging_wallet_endpoint: formSeamless.staging_wallet_endpoint,
      staging_wallet_ip_port: formSeamless.staging_wallet_ip_port,
      staging_service_api_ip: formSeamless.staging_service_api_ip,
      production_desktop_lobby_url: formSeamless.staging_desktop_lobby_url,  
      production_mobile_lobby_url: formSeamless.staging_mobile_lobby_url,
      test_account_productions: testAccountProductions,
      production_wallet_endpoint: formSeamless.staging_wallet_endpoint,
      production_wallet_ip_port: formSeamless.staging_wallet_ip_port,
      production_service_api_ip: formSeamless.staging_service_api_ip
    };
    try {
      const response = await axios
        .put(`${import.meta.env.VITE_API_URL}/customer/${customerId}/seamless`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
  }, []);

  useEffect(() => {
    const isComplete = formSeamless.production_desktop_lobby_url &&
      formSeamless.production_mobile_lobby_url &&
      formSeamless.test_account_productions &&
      formSeamless.production_wallet_endpoint &&
      formSeamless.production_wallet_ip_port &&
      formSeamless.production_service_api_ip;
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
            <Heading size={["sm", "md", "lg"]}>EDIT PRODUCTION DETAILS</Heading>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form onSubmit={(ev) => onSubmit(ev)}>
              <StockInputText 
                label={"Desktop Lobby/Portal URL"} 
                formName={"desktopLobby"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    production_desktop_lobby_url: e.target.value
                  })
                }}
                value={formSeamless.production_desktop_lobby_url}
              />
              <StockInputText 
                label={"Mobile Lobby/Portal URL"} 
                formName={"mobileLobby"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    production_mobile_lobby_url: e.target.value
                  })
                }}
                value={formSeamless.production_mobile_lobby_url}
              />
              <StockInputText 
                label={"Test Accounts"} 
                formName={"testAccountStagings"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    test_account_productions: e.target.value
                  })
                }}
                value={formSeamless.test_account_productions}
              />
              <StockInputText 
                label={"Wallet Endpoint"} 
                formName={"Wallet Endpoint"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    production_wallet_endpoint: e.target.value
                  })
                }}
                value={formSeamless.production_wallet_endpoint}
              />
              <StockInputText 
                label={"Wallet IP and Port"} 
                formName={"productionWalletIPPort"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    production_wallet_ip_port: e.target.value
                  })
                }}
                value={formSeamless.production_wallet_ip_port}
              />
              <StockInputText 
                label={"Service API IP"} 
                formName={"productionServiceApiIp"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    production_service_api_ip: e.target.value
                  })
                }}
                value={formSeamless.production_service_api_ip}
              />
              <Flex>
                <StockFormButton 
                  isEnabled={true}
                  label={"Previous"}
                  onClick={(e) => onClickPrevious()}
                />
                <Spacer />
                <StockFormButton 
                  label={"Update"}
                  toolTipText={"Complete all fields in order to continue"} 
                  isEnabled={true}
                  onClick={(ev) => onSubmit(ev)}
                />
              </Flex>
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
