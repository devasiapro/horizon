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

export const CustomerEditSeamlessContacts = ({ customerId, step }) => {
  const { formSeamless, setFormSeamless } = useContext(FormSeamlessContext);
  const [ errors, setErrors ] = useState({
    businessContact: '',
    billingContact: '',
    technicalContact: '',
    customerContact: '',
    maintainerContact: '',
    companyContact: ''
  });

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=3`);
  };

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=seamless&step=1`);
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
            <Heading size={["sm", "md", "lg"]}>EDIT CONTACTS</Heading>
            <Text fontSize="sm">Required *</Text>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <StockInputText 
                label={"Business Contact"} 
                formName={"businessContact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, business_contact: e.target.value})
                }}
                value={formSeamless.business_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />
              <StockInputText 
                label={"Billing Contact"} 
                formName={"billingContact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, billing_contact: e.target.value})
                }}
                value={formSeamless.billing_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />
              <StockInputText 
                label={"Technical Contact"} 
                formName={"technicalContact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, technical_contact: e.target.value})
                }}
                value={formSeamless.technical_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />
              <StockInputText 
                label={"Customer Contact"} 
                formName={"customerContact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, customer_contact: e.target.value})
                }}
                value={formSeamless.customer_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />
              <StockInputText 
                label={"Maintainer Contact"} 
                formName={"maintainerContact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, maintainer_contact: e.target.value})
                }}
                value={formSeamless.maintainer_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />
              <StockInputText 
                label={"Company Contact"} 
                formName={"Company Contact"}
                onChange={(e) => {
                  setFormSeamless({...formSeamless, company_contact: e.target.value})
                }}
                value={formSeamless.company_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
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
