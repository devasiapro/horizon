import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Text,
  Box,
  Flex,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

export const CustomerAddTransferSubmitted = () => {
  const navigate = useNavigate();

  const goToDashboard = () => navigate("/");
  const goToAddNew = () => navigate("/customer/add?wallet_type=transfer&step=1");

  return (
    <React.Fragment>
      <Box
        bg="white"
        height="42px"
        position="sticky"
        top={"70px"}
        left={0}
        right={0}
        width={"auto"}
        zIndex={1}
        borderBottom={"2px solid"}
        borderColor={"horizon:300"}
      ></Box>
      <Center w={"100%"} mt={20}>
        <Card borderRadius={"20px"} boxShadow="lg" width={"70%"}>
          <CardHeader>
            <Center pt={5}>
              <Heading>
                <Flex color={"horizon.200"}>
                  <Box fontSize={"40px"}>
                    <BsCheckCircleFill />
                  </Box>
                  Submitted
                </Flex>
              </Heading>
            </Center>
          </CardHeader>
          <CardBody color={"horizon.300"}>
            <Text mb={4} textAlign={"center"} fontWeight={600}>
              Customer successfully submitted.
            </Text>
            <HStack>
              <Button onClick={goToDashboard} bg={"transparent"}>
                Go to dashboard
              </Button>
              <Spacer />
              <Button onClick={goToAddNew} bg={"transparent"}>
                Add another customer
              </Button>
            </HStack>
          </CardBody>
        </Card>
      </Center>
    </React.Fragment>
  );
};
