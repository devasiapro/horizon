import React from 'react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Show,
  Card,
  CardHeader,
  Heading,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Container,
  Box 
} from '@chakra-ui/react';

export const CustomerEditSeamlessStep = ({ step }) => {
  return (
    <Box mx={{ base: 2, sm: 2, md: 3, lg: 4 }}>
      <Container
        maxW={"1200px"}
        mt={{ base: "12px", sm: "24px", md: "30px" }}
        mb={{ base: "20px", sm: "40px", md: "50px" }}
        bg={"white"}
        borderRadius={"8px"}
        py={{ base: 2, md: 3 }}
        px={{ base: 5, sm: 6, md: 8 }}
      >
        <Stepper size="lg" colorScheme="horizon" index={step}>
          <Step>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Show above="md">
              <Box>
                <StepTitle>First</StepTitle>
                <StepDescription>General Information</StepDescription>
              </Box>
            </Show>
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Show above="md">
              <Box>
                <StepTitle>Second</StepTitle>
                <StepDescription>Contacts</StepDescription>
              </Box>
            </Show>
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Show above="md">
              <Box>
                <StepTitle>Third</StepTitle>
                <StepDescription>Staging Details</StepDescription>
              </Box>
            </Show>
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Show above="md">
              <Box>
                <StepTitle>Fourth</StepTitle>
                <StepDescription>Production Details</StepDescription>
              </Box>
            </Show>
          </Step>
        </Stepper>
      </Container>
    </Box>
  );
};
