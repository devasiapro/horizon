import React, { 
  useState, 
  useContext, 
  useEffect 
} from 'react';
import axios from 'axios';
import { 
  Show,
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
  Flex,
  Spacer,
  Button
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { FormTransferContext } from '../context/FormTransferContext';
import { CustomerAddTransferStep } from '../components/CustomerAddTransferStep';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { useAuthHook } from "../hooks/useAuthHook";

export const CustomerAddTransferContacts = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errors, setErrors] = useState({
    businessContact: '',
    billingContact: '',
    technicalContact: '',
    customerContact: '',
    maintainerContact: '',
    companyContact: ''
  });

  const useAuth = useAuthHook();
  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=transfer&step=2');
  };

  const cleanValues = (arr: string[]) => {
    return arr.map(element => {
      return element.trim();
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const token = useAuth.getAuth().token;
    const languages = formTransfer.languages ? cleanValues(formTransfer.languages.split(',')) : [];
    const currencies = formTransfer.currencies ? cleanValues(formTransfer.currencies.split(',')) : [];
    const domainWhitelist = formTransfer.domain_whitelist ? 
      cleanValues(formTransfer.domain_whitelist.split(',')) : 
      [];
    const ipWhitelist = formTransfer.ip_whitelist ? cleanValues(formTransfer.ip_whitelist.split(',')) : [];

    const payload = {
      wallet_type: 'transfer',
      merchant_english_name: formTransfer.merchant_english_name,
      merchant_chinese_name: formTransfer.merchant_chinese_name,
      brand_name: formTransfer.brand_name,
      languages: languages,
      currencies: currencies,
      prefix: formTransfer.prefix,
      domain_whitelist: domainWhitelist,
      ip_whitelist: ipWhitelist,
      business_contact: formTransfer.business_contact,
      billing_contact: formTransfer.billing_contact,
      technical_contact: formTransfer.technical_contact,
      customer_contact: formTransfer.customer_contact,
      maintainer_contact: formTransfer.maintainer_contact,
      company_contact: formTransfer.company_contact,
    }; 

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer/transfer`, 
        payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setFormTransfer({
          merchant_english_name: '',
          merchant_chinese_name: '',
          brand_name: '',
          languages: '',
          currencies: '',
          prefix: '',
          domain_whitelist: '',
          ip_whitelist: '',
          business_contact: '',
          billing_contact: '',
          technical_contact: '',
          customer_contact: '',
          maintainer_contact: '',
          company_contact: '',
        });    
        navigate('/customer/add?wallet_type=transfer&step=4'); 
      }
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  return (
    <React.Fragment>

    <CustomerAddTransferStep step={step} />

    <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
      <Card borderRadius={"8px"}>
        <CardHeader
          pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
          color={"horizon.300"}
        >
          <Heading size={["sm", "md", "lg"]}>CONTACTS</Heading>
          <Text fontSize="sm">Required *</Text>
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <StockInputText 
              label={"Business Contact"} 
              formName={"businessContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  business_contact: e.target.value
                })
              }}
              errorMessage={errors.businessContact}
              value={formTransfer.business_contact}
              placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
              helperText={"Contact can be phone number, email or apps like Skype username"}
            />

            <StockInputText 
              label={"Billing Contact"} 
              formName={"billingContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  billing_contact: e.target.value
                })
              }}
              errorMessage={errors.billingContact}
              value={formTransfer.billing_contact}
              placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
              helperText={"Contact can be phone number, email or apps like Skype username"}
            />

            <StockInputText 
              label={"Technical Contact"} 
              formName={"technicalContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  technical_contact: e.target.value
                })
              }}
              errorMessage={errors.technicalContact}
              value={formTransfer.technical_contact}
              placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
              helperText={"Contact can be phone number, email or apps like Skype username"}
            />

            <StockInputText 
              label={"Customer Contact"} 
              formName={"customerContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  customer_contact: e.target.value
                })
              }}
              errorMessage={errors.customerContact}
              value={formTransfer.customer_contact}
              placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
              helperText={"Contact can be phone number, email or apps like Skype username"}
            />

            <StockInputText 
              label={"Maintainer Contact"} 
              formName={"maintainerContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  maintainer_contact: e.target.value
                })
              }}
              errorMessage={errors.maintainerContact}
              value={formTransfer.maintainer_contact}
              placeholder={"e.g. 63-256-1231, contact@mail.com, skypename"}
              helperText={"Contact can be phone number, email or apps like Skype username"}
            />

            <StockInputText 
              label={"Company Contact"} 
              formName={"companyContact"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  company_contact: e.target.value
                })
              }}
              errorMessage={errors.companyContact}
              value={formTransfer.company_contact}
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
                borderRadius={"8px"}
                isDisabled={isFormComplete}
              >
                <Button
                  mt={4}
                  type="submit"
                  colorScheme="horizon"
                  onClick={(e) => onSubmit(e)}
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
