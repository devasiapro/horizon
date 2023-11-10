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

import { CustomerEditTransferStep } from '../components/CustomerEditTransferStep';
import { FormTransferContext } from '../context/FormTransferContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerEditTransferProductInfo = ({ customerId, step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=transfer&step=1`);
  };

  const onClickNext = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=transfer&step=3`);
  };

  useEffect(() => {
    const isComplete = formTransfer.domain_whitelist && formTransfer.ip_whitelist;
    setIsFormComplete(isComplete);
  }, [formTransfer]);

  return (
    <React.Fragment>
      <CustomerEditTransferStep step={step} />

      <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
        <Card borderRadius={"8px"}>
          <CardHeader
            pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
            color={"horizon.300"}
          >
            <Heading size={["sm", "md", "lg"]}>EDIT PRODUCT INFORMATION</Heading>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <StockInputText 
                label={"Domain Whitelist"} 
                formName={"domainWhitelist"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, domain_whitelist: e.target.value})
                }}
                value={formTransfer.domain_whitelist}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"IP Whitelist"} 
                formName={"ipWhitelist"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, ip_whitelist: e.target.value})
                }}
                value={formTransfer.ip_whitelist}
                helperText={"separate by comma"}
              />
              <Flex>
                <StockFormButton label={"Previous"} onClick={(e) => onClickPrevious()}/>
                <Spacer />
                <StockFormButton 
                  label={"Next"}
                  toolTipText={"Complete all fields in order to continue"} 
                  isEnabled={isFormComplete}
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
