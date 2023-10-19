import React from 'react';
import {
  Box,
  Button,
  Text,
  Divider,
  Container,
  Center,
  Tag,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

export const ApiReference = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sampleCode = `
// NodeJS sample implementation
import axios from 'axios';
import crypto from 'crypto';

const API_KEY = 'API_KEY_FROM_ADMIN';
const SECRET_KEY = 'SECRET_KEY_FROM_ADMIN';
 
const casinoUserId = 'CASINO44';
const username = 'goldenplayor';
const hash = crypto
  .createHash('md5')
  .update(casinoUserId + username + SECRET_KEY)
  .digest('hex');

const length = JSON.stringify({
  'casino_user_id': casinoUserId,
  'username': username,
  'hash': hash
}).length;

const call = async () => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await axios.post('https://api.torrospins.com/api/add/user', {
      'casino_user_id': casinoUserId,
      'username': username,
      'hash': hash,
    }, { 
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': length,
        'X-Api-Key': API_KEY
      }, 
    });
    console.log('response', response.data);
  } catch (err) {
    console.log('err' ,err);
  }
};

call();
  `

  return (
    <React.Fragment>
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        API Reference 
      </Heading>

      <Center>
      <Box p="20px" w="1024px" borderRadius="md" borderWidth="1px">
        <Text mb="20px" color="blue.500">https://api.torrospins.com/api</Text>
        <Accordion allowToggle>
          <AccordionItem>
            <h1>
              <AccordionButton bg="blue.50">
                <Box display="flex" as="span" flex="1" textAlign="left">
                  <Tag colorScheme="teal" variant="solid" size="lg">
                    Post
                  </Tag> 
                  <Text ml="20px" mt="6px">
                    /add/user
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h1>
            <AccordionPanel pb={4}>
              <Text as="b">Description:</Text>
              <Text>Add a player to Torrospin records.</Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Headers:</Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Parameters:</Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Responses:</Text>
              <Divider mt="10px" mb="10px"/> 
              <Button onClick={onOpen}>
                Code Sample
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h1>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Request Link Real
                </Box>
              </AccordionButton>
            </h1>
            <AccordionPanel pb={4}>
              adalsdlasfajldjalsdjladjalk
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h1>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  End Session
                </Box>
              </AccordionButton>
            </h1>
            <AccordionPanel pb={4}>
              adalsdlasfajldjalsdjladjalk
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      </Center>

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>NodeJS Example</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Code>
              <pre>
                {sampleCode}
              </pre>
            </Code>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
    </React.Fragment>
  );
};
