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

export const CustomerEditSeamlessGeneral = ({ customerId, step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=2`);
  };

  useEffect(() => {
    const isComplete = formSeamless.merchant_english_name &&
      formSeamless.brand_name &&
      formSeamless.regulations &&
      formSeamless.market_jurisdiction &&
      formSeamless.licenses &&
      formSeamless.office_ips &&
      formSeamless.language_used &&
      formSeamless.currencies_used &&
      formSeamless.default_currency;
    setIsFormComplete(isComplete);
  }, []);

  useEffect(() => {
    const isComplete = formSeamless.merchant_english_name &&
      formSeamless.brand_name &&
      formSeamless.regulations &&
      formSeamless.market_jurisdiction &&
      formSeamless.licenses &&
      formSeamless.office_ips &&
      formSeamless.language_used &&
      formSeamless.currencies_used &&
      formSeamless.default_currency;
    setIsFormComplete(isComplete);
  }, [formSeamless]);

  return (
    <React.Fragment>
      <CustomerEditSeamlessStep step={step} />

      <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
        <Card borderRadius={"8px"}>
          <CardHeader
            pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
            color={"horizon.300"}
          >
            <Heading size={["sm", "md", "lg"]}>EDIT GENERAL INFORMATION</Heading>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Show>
                    <StockInputText 
                      label={"Merchant English Name"} 
                      formName={"merchantEnglishName"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, merchant_english_name: e.target.value})
                      }}
                      value={formSeamless.merchant_english_name}
                    />
                  </Show>
                  <Show>
                    <StockInputText 
                      label={"Brand Name"} 
                      formName={"brandName"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, brand_name: e.target.value})
                      }}
                      value={formSeamless.brand_name}
                    />
                  </Show>
                </SimpleGrid>
              </Show>
              <StockInputText 
                label={"Regulations"} 
                formName={"regulations"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, regulations: e.target.value})
                }}
                value={formSeamless.regulations}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Market Jurisdiction"} 
                formName={"market_jurisdiction"}
                onChange={(e) => {
                  setFormTransfer({...formSeamless, market_jurisdiction: e.target.value})
                }}
                value={formSeamless.market_jurisdiction}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Licenses"} 
                formName={"licenses"}
                onChange={(e) => {
                  setFormTransfer({...formSeamless, licenses: e.target.value})
                }}
                value={formSeamless.licenses}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Office IPs"} 
                formName={"office_ips"}
                onChange={(e) => {
                  setFormTransfer({...formSeamless, office_ips: e.target.value})
                }}
                value={formSeamless.office_ips}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Language Used"} 
                formName={"languages"}
                onChange={(e) => {
                  setFormTransfer({...formSeamless, language_used: e.target.value})
                }}
                value={formSeamless.language_used}
                helperText={"separate by comma"}
              />
              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Show>
                    <StockInputText 
                      label={"Currencies Used"} 
                      formName={"currenciesUsed"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, currencies_used: e.target.value})
                      }}
                      value={formSeamless.currencies_used}
                      helperText={"separate by comma"}
                    />
                  </Show>
                  <Show>
                    <StockInputText 
                      label={"Default Currency"} 
                      formName={"defaultCurrency"}
                      onChange={(e) => {
                        setFormSeamless({...formSeamless, default_currency: e.target.value})
                      }}
                      value={formSeamless.default_currency}
                    />
                  </Show>
                </SimpleGrid>
              </Show>
              <StockFormButton 
                toolTipText={"Complete all fields in order to continue"} 
                isEnabled={isFormComplete}
                onClick={(e) => onClickNext()}
              />
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
