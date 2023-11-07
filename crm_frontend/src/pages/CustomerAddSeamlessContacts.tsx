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

export const CustomerAddSeamlessContacts = ({ step }) => {
  const {formSeamless, setFormSeamless} = useContext(FormSeamlessContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=seamless&step=1');
  };

  const onClickNext = () => {
    navigate('/customer/add?wallet_type=seamless&step=3');
  };

  useEffect(() => {
    const isComplete = formSeamless.business_contact &&
      formSeamless.billing_contact &&
      formSeamless.technical_contact &&
      formSeamless.customer_contact &&
      formSeamless.maintainer_contact &&
      formSeamless.company_contact;
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
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Business Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    business_contact: e.target.value,
                  })
                }
                name="businessContact"
                value={formSeamless.business_contact}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Billing Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    billing_contact: e.target.value,
                  })
                }
                name="billingContact"
                value={formSeamless.billing_contact}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Technical Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    technical_contact: e.target.value,
                  })
                }
                name="technicalContact"
                value={formSeamless.technical_contact}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Customer Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    customer_contact: e.target.value,
                  })
                }
                name="technicalContact"
                value={formSeamless.customer_contact}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Maintainer Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    maintainer_contact: e.target.value,
                  })
                }
                name="technicalContact"
                value={formSeamless.maintainer_contact}
              />

              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Company Contact
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                mb={3}
                borderRadius={"20px"}
                bg={"horizon.150"}
                onChange={(e) =>
                  setFormSeamless({
                    ...formSeamless,
                    company_contact: e.target.value,
                  })
                }
                name="technicalContact"
                value={formSeamless.company_contact}
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
                    isDisabled={!isFormComplete}
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
