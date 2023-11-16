import React, { 
  useState, 
  useContext, 
  useEffect 
} from 'react';
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

export const CustomerAddTransferProductInfo = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errors, setErrors] = useState({
    domainWhitelist: '',
    ipWhitelist: ''
  });

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=transfer&step=1');
  };

  const onClickNext = () => {
    let isError = false;
    let tempErrors = {
      domainWhitelist: '',
      ipWhitelist: ''
    };

    if (!formTransfer.domain_whitelist) {
      tempErrors = {...tempErrors, domainWhitelist: 'Domain Whitelist is required.'};
      isError = true;
    }

    if (!formTransfer.ip_whitelist) {
      tempErrors = {...tempErrors, ipWhitelist: 'IP Whitelist is required.'};
      isError = true;
    }

    setErrors(tempErrors);
    if (!isError) {
      navigate('/customer/add?wallet_type=transfer&step=3');
    }
  };

  useEffect(() => {
    const isComplete = formTransfer.domain_whitelist && formTransfer.ip_whitelist;
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
          <Heading size={["sm", "md", "lg"]}>PRODUCT INFORMATION</Heading>
          <Text fontSize="sm">Required *</Text>
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <StockInputText 
              label={"Domain Whitelist *"} 
              formName={"domainWhitelist"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  domain_whitelist: e.target.value
                })
              }}
              errorMessage={errors.domainWhitelist}
              helperText={'Seperate by comma'}
              value={formTransfer.domain_whitelist}
              placeholder={"e.g. www.domain.com, www.domain2.com"}
            />

            <StockInputText 
              label={"IP Whitelist *"} 
              formName={"ipWhitelist"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  ip_whitelist: e.target.value
                })
              }}
              errorMessage={errors.ipWhitelist}
              helperText={'Seperate by comma'}
              value={formTransfer.ip_whitelist}
              placeholder={"e.g. 123.421.321.233, 231.231.432.123"}
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
