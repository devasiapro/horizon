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

import { CustomerAddTransferStep } from '../components/CustomerAddTransferStep';
import { FormTransferContext } from '../context/FormTransferContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';

export const CustomerAddTransfer = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errors, setErrors] = useState({
    merchantEnglishName: '',
    merchantChineseName: '',
    brandName: '',
    languagesUsed: '',
    currenciesUsed: ''
  });

  const navigate = useNavigate();

  const onClickNext = () => {
    let isError = false;
    let tempErrors = {
      merchantEnglishName: '',
      merchantChineseName: '',
      brandName: '',
      languagesUsed: '',
      currenciesUsed: ''
    };

    if (!formTransfer.merchant_english_name) {
      tempErrors = {...tempErrors, merchantEnglishName: 'Merchant English Name is required.'};
      isError = true;
    }

    if (!formTransfer.brand_name) {
      tempErrors = {...tempErrors, brandName: 'Brand Name is required.'};
      isError = true;
    }

    if (!formTransfer.languages) {
      tempErrors = {...tempErrors, languagesUsed: 'Language is required.'};
      isError = true;
    }

    if (!formTransfer.currencies) {
      tempErrors = {...tempErrors, currenciesUsed: 'Currency is required.'};
      isError = true;
    }

    setErrors(tempErrors);
    if (!isError) {
      navigate('/customer/add?wallet_type=transfer&step=2');
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
          <Heading size={["sm", "md", "lg"]}>GENERAL INFORMATION</Heading>
          <Text fontSize="sm">Required *</Text>
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <Show above="md">
              <SimpleGrid columns={2} spacing={5}>
                <Box>
                  <StockInputText 
                    label={"Merchant English Name *"} 
                    formName={"merchantEnglishName"}
                    onChange={(e) => {
                      setFormTransfer({
                        ...formTransfer, 
                        merchant_english_name: e.target.value
                      })
                    }}
                    errorMessage={errors.merchantEnglishName}
                    value={formTransfer.merchant_english_name}
                  />
                </Box>
                <Box>
                  <StockInputText 
                    label={"Merchant Chinese Name"} 
                    formName={"merchantChineseName"}
                    onChange={(e) => {
                      setFormTransfer({
                        ...formTransfer, 
                        merchant_chinese_name: e.target.value
                      })
                    }}
                    errorMessage={errors.merchantChineseName}
                    value={formTransfer.merchant_chinese_name}
                  />
                </Box>
              </SimpleGrid>
            </Show>
            <StockInputText 
              label={"Brand Name *"} 
              formName={"brandName"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  brand_name: e.target.value
                })
              }}
              errorMessage={errors.brandName}
              value={formTransfer.brand_name}
            />
            <StockInputText 
              label={"Languages Used *"} 
              formName={"languagesUsed"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  languages: e.target.value
                })
              }}
              errorMessage={errors.languagesUsed}
              value={formTransfer.languages}
              placeholder={"e.g. English, Chinese"}
            />
            <StockInputText 
              label={"Currencies Used *"} 
              formName={"currenciesUsed"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  currencies: e.target.value
                })
              }}
              errorMessage={errors.currenciesUsed}
              value={formTransfer.currencies}
              placeholder={"e.g. USD, YEN"}
            />
            <StockInputText 
              label={"Prefix"} 
              formName={"prefix"}
              onChange={(e) => {
                setFormTransfer({
                  ...formTransfer, 
                  prefix: e.target.value
                })
              }}
              errorMessage={errors.prefix}
              value={formTransfer.prefix}
            />
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
                onClick={(e) => onClickNext()}
              >
                Next
              </Button>
            </Tooltip>
          </form>
        </CardBody>
      </Card>
    </Container>

    </React.Fragment>
  );
};
