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
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerAddSeamless = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [errors, setErrors] = useState({
    merchantEnglishName: '',
    brandName: '',
    regulations: '',
    marketJurisdictions: '',
    licenses: '',
    officeIps: '',
    langaugesUsed: '',
    currenciesUsed: '',
    defaultCurrency: ''
  });

  const navigate = useNavigate();

  const onClickNext = () => {
    let isError = false;
    let tempErrors = {
      merchantEnglishName: '',
      brandName: '',
      regulations: '',
      marketJurisdictions: '',
      licenses: '',
      officeIps: '',
      langaugesUsed: '',
      currenciesUsed: '',
      defaultCurrency: ''
    };
    if (!formSeamless.merchant_english_name) {
      tempErrors = {...tempErrors, merchantEnglishName: 'Merchant English Name is required.'};
      isError = true;
    }

    if (!formSeamless.brand_name) {
      tempErrors = {...tempErrors, brandName: 'Brand Name is required.'};
      isError = true;
    }

    if (!formSeamless.regulations) {
      tempErrors = {...tempErrors, regulations: 'Regulation is required.'};
      isError = true;
    }

    if (!formSeamless.market_jurisdiction) {
      tempErrors = {...tempErrors, marketJurisdictions: 'Market Jurisdictions is required.'};
      isError = true;
    }

    if (!formSeamless.license) {
      tempErrors = {...tempErrors, licenses: 'Licenses is required.'};
      isError = true;
    }

    if (!formSeamless.office_ips) {
      tempErrors = {...tempErrors, officeIps: 'Office IPs is required.'};
      isError = true;
    }

    if (!formSeamless.language_used) {
      tempErrors = {...tempErrors, languagesUsed: 'Languages is required.'};
      isError = true;
    }

    if (!formSeamless.currencies_used) {
      tempErrors = {...tempErrors, currenciesUsed: 'Currencies is required.'};
      isError = true;
    }

    if (!formSeamless.currencies_used.includes(formSeamless.default_currency)) {
      tempErrors = {
        ...tempErrors, 
        defaultCurrency: 'Default Currency must be included in Currencies Used.'
      };
      isError = true;
    }

    if (!formSeamless.default_currency) {
      tempErrors = {...tempErrors, defaultCurrency: 'Default Currency is required.'};
      isError = true;
    }

    setErrors(tempErrors);
    if (!isError) {
      navigate('/customer/add?wallet_type=seamless&step=2');
    }
  };

  return (
    <React.Fragment>
      <CustomerAddSeamlessStep step={step} />

      <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
        <Card borderRadius={"8px"}>
          <CardHeader
            pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
            color={"horizon.300"}
          >
            <Heading size={["sm", "md", "lg"]}>GENERAL INFORMATION</Heading>
            <Text fontSize="sm">Required *</Text>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Show>
                    <StockInputText 
                      label={"Merchant English Name *"} 
                      formName={"merchantEnglishName"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, merchant_english_name: e.target.value})
                      }}
                      errorMessage={errors.merchantEnglishName}
                      value={formSeamless.merchant_english_name}
                    />

                    <StockInputText 
                      label={"Brand Name *"} 
                      formName={"brandName"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, brand_name: e.target.value})
                      }}
                      errorMessage={errors.brandName}
                      value={formSeamless.brand_name}
                    />
                  </Show>
                </SimpleGrid>
              </Show>
              <StockInputText 
                label={"Regulations *"} 
                formName={"regulations"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, regulations: e.target.value})
                }}
                errorMessage={errors.regulations}
                value={formSeamless.regulations}
                helperText={"Seperate by comma"}
              />

              <StockInputText 
                label={"Market Jurisdictions *"} 
                formName={"marketJurisdictions"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, market_jurisdiction: e.target.value})
                }}
                errorMessage={errors.marketJurisdictions}
                value={formSeamless.market_jurisdiction}
                helperText={"Seperate by comma"}
              />

              <StockInputText 
                label={"Licenses *"} 
                formName={"licenses"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, license: e.target.value})
                }}
                errorMessage={errors.license}
                value={formSeamless.license}
                helperText={"Seperate by comma"}
              />

              <StockInputText 
                label={"Office IPs *"} 
                formName={"officeIps"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, office_ips: e.target.value})
                }}
                errorMessage={errors.officeIps}
                value={formSeamless.office_ips}
                helperText={"Seperate by comma"}
              />

              <StockInputText 
                label={"Languages Used *"} 
                formName={"languagesUsed"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, language_used: e.target.value})
                }}
                errorMessage={errors.languagesUsed}
                value={formSeamless.language_used}
                helperText={"Seperate by comma"}
              />

              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Box>
                    <StockInputText 
                      label={"Currencies Used *"} 
                      formName={"currenciesUsed"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, currencies_used: e.target.value})
                      }}
                      errorMessage={errors.currenciesUsed}
                      value={formSeamless.currencies_used}
                      helperText={"Seperate by comma"}
                    />
                  </Box>
                  <Box>
                    <StockInputText 
                      label={"Default Currency *"} 
                      formName={"defaultCurrency"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, default_currency: e.target.value})
                      }}
                      errorMessage={errors.defaultCurrency}
                      value={formSeamless.default_currency}
                      helperText={"Seperate by comma"}
                    />
                  </Box>
                </SimpleGrid>
                <Flex>
                  <Tooltip
                    hasArrow
                    label="Complete all fields in order to submit"
                    borderRadius={"20px"}
                    isDisabled={isFormComplete}
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
              </Show>
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
