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
import { useAuthHook } from "../hooks/useAuthHook";

export const CustomerAddTransferContacts = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/customer/transfer`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response);
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

  useEffect(() => {
    const isComplete = formTransfer.business_contact && 
      formTransfer.billing_contact &&
      formTransfer.technical_contact &&
      formTransfer.customer_contact &&
      formTransfer.maintainer_contact &&
      formTransfer.company_contact;
    setIsFormComplete(isComplete);
  }, [formTransfer]);

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
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Business Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  business_contact: e.target.value,
                })
              }
              name="businessContact"
              value={formTransfer.business_contact}
            />
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Billing Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  billing_contact: e.target.value,
                })
              }
              name="billingContact"
              value={formTransfer.billing_contact}
            />
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Technical Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  technical_contact: e.target.value,
                })
              }
              name="technicalContact"
              value={formTransfer.technical_contact}
            />
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Customer Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  customer_contact: e.target.value,
                })
              }
              name="customerContact"
              value={formTransfer.customer_contact}
            />
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Maintainer Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  maintainer_contact: e.target.value,
                })
              }
              name="maintainerContact"
              value={formTransfer.maintainer_contact}
            />
            <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
              Company Contact
            </FormLabel>
            <Input
              size={["sm", "md"]}
              type="text"
              mb={3}
              borderRadius={"8px"}
              bg={"horizon.150"}
              onChange={(e) =>
                setFormTransfer({
                  ...formTransfer,
                  company_contact: e.target.value,
                })
              }
              name="companyContact"
              value={formTransfer.company_contact}
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
