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
  Select,
  Button
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { CustomerEditTransferStep } from '../components/CustomerEditTransferStep';
import { FormTransferContext } from '../context/FormTransferContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { StockInputFile } from '../components/StockInputFile';

export const CustomerEditTransferContracts = ({ customerId, step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=transfer&step=3`);
  };

  const onSubmit = () => {

  };

  const onFileChange = (file) => {
    
  };

  return (
    <React.Fragment>

    <CustomerEditTransferStep step={step} />
    
    <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
      <Card borderRadius={"8px"}>
        <CardHeader
          pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
          color={"horizon.300"}
        >
          <Heading size={["sm", "md", "lg"]}>UPDATE CONTRACTS</Heading>
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form onSubmit={() => onSubmit()}>
            <FormControl mb={3} variant={"horizon"}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>Stastus</FormLabel>
              <Select

              >
                <option value=''>Preparation</option>
                <option value=''>Sent To Customer</option>
                <option value=''>Clarifications With Customer</option>
                <option value=''>Done</option>
              </Select>
            </FormControl>
            <StockInputText 
              label={"Contract Label"} 
              formName={"contactLabel"}
              onChange={(e) => {
                setFormTransfer({...formTransfer, contact_label: e.target.value})
              }}
              value={formTransfer.contact_label}
            /> 

            <StockInputFile onChangeCallback={onFileChange} />
            <Flex>
              <StockFormButton label={"Previous"} onClick={(e) => onClickPrevious()}/>
              <Spacer />
              <StockFormButton 
                label={"Update"}
                toolTipText={"Complete all fields in order to continue"} 
                isEnabled={true}
                onClick={(e) => onSubmit()}
              />
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Container>

    </React.Fragment>
  );
};
