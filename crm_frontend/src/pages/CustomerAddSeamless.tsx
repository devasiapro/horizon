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
import { FormSeamlessContext } from '../context/FormSeamlessContext';

export const CustomerAddSeamless = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickNext = () => {
    navigate('/customer/add?wallet_type=seamless&step=2');
  };

  useEffect(() => {
    const isComplete = formSeamless.merchant_english_name &&
      formSeamless.brand_name &&
      formSeamless.regulations &&
      formSeamless.market_jurisdiction &&
      formSeamless.license &&
      formSeamless.office_ips &&
      formSeamless.language_used &&
      formSeamless.currencies_used &&
      formSeamless.default_currency;
    setIsFormComplete(isComplete);
  }, [formSeamless]);

  return (
    <React.Fragment>
      <CustomerAddSeamlessStep step={step} />

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
                  <Show>
                    <FormControl>
                      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                        Merchant English Name
                      </FormLabel>
                      <Input
                        size={["sm", "md"]}
                        type="text"
                        mb={3}
                        onChange={(e) => {
                          setFormSeamless({
                            ...formSeamless, 
                            merchant_english_name: e.target.value
                          })
                        }}
                        borderRadius={"8px"}
                        bg={"horizon.150"}
                        name="licenseeName"
                        value={formSeamless.merchant_english_name}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                        Brand Name 
                      </FormLabel>
                      <Input
                        size={["sm", "md"]}
                        type="text"
                        mb={3}
                        onChange={(e) => {
                          setFormSeamless({
                            ...formSeamless, 
                            brand_name: e.target.value
                          })
                        }}
                        borderRadius={"8px"}
                        bg={"horizon.150"}
                        name="licenseeName"
                        value={formSeamless.brand_name}
                      />
                    </FormControl>
                  </Show>
                </SimpleGrid>
              </Show>
              <FormControl>
                <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                  Regulations
                </FormLabel>
                <Input
                  size={["sm", "md"]}
                  type="text"
                  mb={3}
                  onChange={(e) =>
                    setFormSeamless({
                      ...formSeamless,
                      regulations: e.target.value,
                    })
                  }
                  borderRadius={"8px"}
                  bg={"horizon.150"}
                  name="regulations"
                  value={formSeamless.regulations}
                />
              </FormControl>
              <FormControl>
                <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                  Market Jurisdiction
                </FormLabel>
                <Input
                  size={["sm", "md"]}
                  type="text"
                  mb={3}
                  onChange={(e) =>
                    setFormSeamless({
                      ...formSeamless,
                      market_jurisdiction: e.target.value,
                    })
                  }
                  borderRadius={"8px"}
                  bg={"horizon.150"}
                  name="marketJurisdiction"
                  value={formSeamless.market_jurisdiction}
                />
              </FormControl>
              <FormControl>
                <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                  License
                </FormLabel>
                <Input
                  size={["sm", "md"]}
                  type="text"
                  mb={3}
                  onChange={(e) =>
                    setFormSeamless({
                      ...formSeamless,
                      license: e.target.value,
                    })
                  }
                  borderRadius={"8px"}
                  bg={"horizon.150"}
                  name="license"
                  value={formSeamless.license}
                />
              </FormControl>
              <FormControl>
                <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                  Office IPs
                </FormLabel>
                <Input
                  size={["sm", "md"]}
                  type="text"
                  mb={3}
                  onChange={(e) =>
                    setFormSeamless({
                      ...formSeamless,
                      office_ips: e.target.value,
                    })
                  }
                  borderRadius={"8px"}
                  bg={"horizon.150"}
                  name="officeIps"
                  value={formSeamless.office_ips}
                />
              </FormControl>
              <FormControl>
                <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                  Language Used
                </FormLabel>
                <Input
                  size={["sm", "md"]}
                  type="text"
                  mb={3}
                  onChange={(e) =>
                    setFormSeamless({
                      ...formSeamless,
                      language_used: e.target.value,
                    })
                  }
                  borderRadius={"8px"}
                  bg={"horizon.150"}
                  name="languageUsed"
                  value={formSeamless.language_used}
                />
              </FormControl>
              <Show above="md">
                <SimpleGrid columns={2} spacing={5}>
                  <Box>
                    <FormControl>
                      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                        Currencies Used
                      </FormLabel>
                      <Input
                        size={["sm", "md"]}
                        type="text"
                        mb={3}
                        onChange={(e) =>
                          setFormSeamless({
                            ...formSeamless,
                            currencies_used: e.target.value,
                          })
                        }
                        borderRadius={"8px"}
                        bg={"horizon.150"}
                        name="currencies"
                        value={formSeamless.currencies_used}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                        Default Currency
                      </FormLabel>
                      <Input
                        size={["sm", "md"]}
                        type="text"
                        mb={3}
                        onChange={(e) =>
                          setFormSeamless({
                            ...formSeamless,
                            default_currency: e.target.value,
                          })
                        }
                        borderRadius={"8px"}
                        bg={"horizon.150"}
                        name="defaultCurrency"
                        value={formSeamless.default_currency}
                      />
                    </FormControl>
                  </Box>
                </SimpleGrid>
                <Flex>
                  <Tooltip
                    hasArrow
                    label="Complete all fields in order to submit"
                    borderRadius={"20px"}
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
                </Flex>
              </Show>
            </form>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};
