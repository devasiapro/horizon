import React, { useState, useContext, useEffect } from 'react';
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
  Button
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { CustomerEditTransferStep } from '../components/CustomerEditTransferStep';
import { FormTransferContext } from '../context/FormTransferContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerEditTransferGeneral = ({ customerId, step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate(`/customer/${customerId}/edit?wallet_type=transfer&step=2`);
  };

  useEffect(() => {
    const isComplete = formTransfer.merchant_english_name &&
      formTransfer.merchant_chinese_name &&
      formTransfer.brand_name &&
      formTransfer.languages &&
      formTransfer.currencies &&
      formTransfer.prefix;
    setIsFormComplete(isComplete);
  }, []);

  useEffect(() => {
    const isComplete = formTransfer.merchant_english_name &&
      formTransfer.merchant_chinese_name &&
      formTransfer.brand_name &&
      formTransfer.languages &&
      formTransfer.currencies &&
      formTransfer.prefix;
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
            <Heading size={["sm", "md", "lg"]}>EDIT GENERAL INFORMATION</Heading>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <form>
              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Box>
                    <StockInputText 
                      label={"Merchant English Name"} 
                      formName={"merchantName"}
                      onChange={(e) => {
                        setFormTransfer({...formTransfer, merchant_english_name: e.target.value})
                      }}
                      value={formTransfer.merchant_english_name}
                    />
                  </Box>
                  <Box>
                    <StockInputText 
                      label={"Merchant Chinese Name"} 
                      formName={"merchantChineseName"}
                      onChange={(e) => {
                        setFormTransfer({...formTransfer, merchant_chinese_name: e.target.value})
                      }}
                      value={formTransfer.merchant_chinese_name}
                    />
                  </Box>
                </SimpleGrid>
              </Show>
              <StockInputText 
                label={"Brand Name"} 
                formName={"brandName"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, brand_name: e.target.value})
                }}
                value={formTransfer.brand_name}
              />
              <StockInputText 
                label={"Languages Used"} 
                formName={"languages"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, languages: e.target.value})
                }}
                value={formTransfer.languages}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Currencies"} 
                formName={"currencies"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, currencies: e.target.value})
                }}
                value={formTransfer.currencies}
                helperText={"separate by comma"}
              />
              <StockInputText 
                label={"Prefix"} 
                formName={"prefix"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, prefix: e.target.value})
                }}
                value={formTransfer.prefix}
              />
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
