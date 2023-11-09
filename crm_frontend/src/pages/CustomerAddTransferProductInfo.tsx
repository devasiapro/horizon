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

export const CustomerAddTransferProductInfo = ({ step }) => {
  const {formTransfer, setFormTransfer} = useContext(FormTransferContext);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();

  const onClickPrevious = () => {
    navigate('/customer/add?wallet_type=transfer&step=1');
  };

  const onClickNext = () => {
    navigate('/customer/add?wallet_type=transfer&step=3');
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
        </CardHeader>
        <CardBody color={"horizon.300"}>
          <form>
            <FormControl mb={3} variant={"horizon"}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                Domain Whitelist
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                borderRadius={"8px"}
                bg={"horizon.150"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, domain_whitelist: e.target.value})
                }}
                name="domainWhitelist"
                value={formTransfer.domain_whitelist}
              />
              <FormHelperText ml={"15px"}>Seperate by comma</FormHelperText>
            </FormControl>

            <FormControl mb={3} variant={"horizon"}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>
                IP Whitelist
              </FormLabel>
              <Input
                size={["sm", "md"]}
                type="text"
                borderRadius={"8px"}
                bg={"horizon.150"}
                onChange={(e) => {
                  setFormTransfer({...formTransfer, ip_whitelist: e.target.value})
                }}
                name="ipWhitelist"
                value={formTransfer.ip_whitelist}
              />
              <FormHelperText ml={"15px"}>Seperate by comman</FormHelperText>
            </FormControl>
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
