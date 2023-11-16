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
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { FormSeamlessContext } from '../context/FormSeamlessContext';

export const CustomerAddSeamlessContacts = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [ isFormComplete, setIsFormComplete ] = useState(false);
  const [ errors, setErrors ] = useState({
    businessContact: '',
    billingContact: '',
    technicalContact: '',
    customerContact: '',
    maintainerContact: '',
    companyContact: ''
  });

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=seamless&step=1');
  };

  const onClickNext = () => { 
    navigate('/customer/add?wallet_type=seamless&step=3');
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
            <Heading size={["sm", "md", "lg"]}>Contacts</Heading>
            <Text fontSize="sm">Required *</Text>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <StockInputText 
                label={"Business Contact"} 
                formName={"businessContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    business_contact: e.target.value
                  })
                }}
                errorMessage={errors.businessContact}
                value={formSeamless.business_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />

              <StockInputText 
                label={"Billing Contact"} 
                formName={"billingContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    billing_contact: e.target.value
                  })
                }}
                errorMessage={errors.billingContact}
                value={formSeamless.billing_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />

              <StockInputText 
                label={"Technical Contact"} 
                formName={"technicalContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    technical_contact: e.target.value
                  })
                }}
                errorMessage={errors.technicalContact}
                value={formSeamless.technical_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />

              <StockInputText 
                label={"Customer Contact"} 
                formName={"customerContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    customer_contact: e.target.value
                  })
                }}
                errorMessage={errors.customerContact}
                value={formSeamless.customer_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />

              <StockInputText 
                label={"Maintainer Contact"} 
                formName={"maintainerContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    maintainer_contact: e.target.value
                  })
                }}
                errorMessage={errors.maintainerContact}
                value={formSeamless.maintainer_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
              />

              <StockInputText 
                label={"Company Contact"} 
                formName={"companyContact"}
                onChange={(e) => {
                  setFormSeamless({
                    ...formSeamless, 
                    company_contact: e.target.value
                  })
                }}
                errorMessage={errors.companyContact}
                value={formSeamless.company_contact}
                placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
                helperText={"Contact can be phone number, email or apps like Skype username"}
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
                    onClick={(e) => {
                      onClickNext();
                    }}
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
