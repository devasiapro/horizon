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

export const CustomerAddTransfer = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate('/customer/add?wallet_type=transfer&step=2');
  };

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

    <CustomerAddTransferStep step={step} />

    <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
      <Card borderRadius={"8px"}>
        <CardHeader
          pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
          color={"horizon.300"}
        >
          <Heading size={["sm", "md", "lg"]}>GENERAL INFORMATION</Heading>
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <Show above="md">
              <SimpleGrid columns={2} spacing={5}>
                <Box>
                  <FormControl variant={"horizon"}>
                    <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                      Merchant English Name
                    </FormLabel>
                    <Input
                      size={["sm", "md"]}
                      type="text"
                      mb={3}
                      borderRadius={"8px"}
                      bg={"horizon.150"}
                      name="merchantName"
                      onChange={(e) => {
                        setFormTransfer({...formTransfer, merchant_english_name: e.target.value})
                      }}
                      value={formTransfer.merchant_english_name}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                      Merchant Chinese Name
                    </FormLabel>
                    <Input
                      size={["sm", "md"]}
                      type="text"
                      mb={3}
                      onChange={(e) => {
                        setFormTransfer({...formTransfer, merchant_chinese_name: e.target.value})
                      }}
                      borderRadius={"8px"}
                      bg={"horizon.150"}
                      name="merchantChineseName"
                      value={formTransfer.merchant_chinese_name}
                    />
                  </FormControl>
                </Box>
              </SimpleGrid>
            </Show>
            <FormControl>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Brand Name
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, brand_name: e.target.value})
                }}
                borderRadius={"8px"}
                bg={"horizon.150"}
                name="brandName"
                value={formTransfer.brand_name}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Languages Used
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                onChange={(e) => {
                  setFormTransfer({...formTransfer, languages: e.target.value})
                }}
                borderRadius={"8px"}
                bg={"horizon.150"}
                name="languages"
                value={formTransfer.languages}
              />
              <FormHelperText ml={"15px"}>seperate by comma</FormHelperText>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Currencies Used
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                onChange={(e) => {
                  setFormTransfer({...formTransfer, currencies: e.target.value})
                }}
                borderRadius={"8px"}
                bg={"horizon.150"}
                name="currrencies"
                value={formTransfer.currencies}
              />
              <FormHelperText ml={"15px"}>seperate by comma</FormHelperText>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Prefix
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                onChange={(e) => {
                  setFormTransfer({...formTransfer, prefix: e.target.value})
                }}
                borderRadius={"8px"}
                bg={"horizon.150"}
                name="currrencies"
                value={formTransfer.prefix}
              />
            </FormControl>
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
                isDisabled={!isFormComplete}
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
