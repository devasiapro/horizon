import React from "react";
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
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

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
  `;

  const docs = {
    addUser: {
      headers: `
'Content-Type': 'application/json'
'X-Api-Key': API_KEY_HERE

`,
      parameters: `
      {
          "casino_user_id": "casinouserid",
          "username": "casinouser",
          "hash": "hashstring"
      }
      `,
      responseSuccess: `
      {
        "casino_user_id": "casinouserid",
        "username": "casinouser"
      }

`,
    },
    requestLink: {
      headers: `
      'Content-Type': 'application/json'
      'X-Api-Key': API_KEY_HERE

`,
      parameters:
        `
      {
        "token": "string",
        "game_name": "string",
        "user_id": 0,
        "bank_id": 0,
        "currency": "string",
        "quit_link": "string",
        "device": "string",
        "lang": "string",
        "free_spin": 0,
        "hash": "string"
      }

`,
      responseSuccess: `
      {
        "message": "URL was created.",
        "success": true,
        "url": "127.0.0.1:8001/start_game?token=b7c5569b8d71743c7014d276da25e6bb&api_exit=/quit",
        "token": "sdfsdfssdfSssdsfgsdfsdfdsafddasfdasdfafasdafdgajdafahgasadaffssdaaasdsasadff",
        "status": 200
      }

`,
    },
    gameClosed: {
        headers: `
      'Content-Type': 'application/json'
      'X-Api-Key': API_KEY_HERE

`,
        parameters:
          `
        {
          "request_token": "wiYXVkIjoid3d3ldEBleGFtcGxlLm",
          "hash": "0bb4cb2d8f091215f43dd08a11fcc9ef"
        }

`,
        responseSuccess: `
      {
        "message": "Free spin removed successfully."
      }

`,
      }
    }

  return (
    <React.Fragment>
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        API Reference
      </Heading>
      <Center>
        <Box p="20px" w="1024px" borderRadius="md" borderWidth="1px">
          <Text mb="20px" color="blue.500">
            https://api.torrospins.com/api
          </Text>
          <Accordion allowToggle>
            <AccordionItem>
              <h1>
                <AccordionButton bg="blue.50">
                  <Box
                    display="flex"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    <Tag
                      colorScheme="teal"
                      variant="solid"
                      size="lg"
                    >
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
                <Divider mt="10px" mb="10px" />
                <Text as="b">Headers:</Text>
                <Box w="100%">
                  <Code w={"100%"}>
                    <pre>{docs.addUser.headers}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Parameters:</Text>
                <TableContainer
                  mt="20px"
                  mb="20px"
                  borderWidth="1px"
                >
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>casino_user_id</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            Your generated 8
                            character unique name.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Username</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The username used in
                            login.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Hash</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            Generated hash key.
                            Please refer to the
                            Developer Reference on
                            how to generate a hash
                            key.
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Box>
                  <Code w={"100%"}>
                    <pre>{docs.addUser.parameters}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Responses:</Text>
                <Text>201</Text>
                <Box>
                  <Code w={"100%"}>
                    <pre>
                      {docs.addUser.responseSuccess}
                    </pre>
                  </Code>
                </Box>

                <Divider mt="10px" mb="10px" />
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={onOpen}
                >
                  Code Sample
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h1>
                <AccordionButton bg="blue.50">
                  <Box
                    display="flex"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    <Tag
                      colorScheme="teal"
                      variant="solid"
                      size="lg"
                    >
                      Post
                    </Tag>
                    <Text ml="20px" mt="6px">
                      /request-link-real
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h1>
              <AccordionPanel pb={4}>
                <Text as="b">Description:</Text>
                <Text>
                  Request game launcher link from
                  Torrospin.
                </Text>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Headers:</Text>
                <Box w="100%">
                  <Code w={"100%"}>
                    <pre>{docs.addUser.headers}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Parameters:</Text>
                <TableContainer
                  mt="20px"
                  mb="20px"
                  borderWidth="1px"
                >
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>token</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            Your generated
                            unique token.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>game_name</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The game ID you want to launch, which
                            can be found in the "Games" section of
                            the Torrospin back office.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>user_id</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The username's equivalent ID. Should not exceed 8 characters.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>bank_id</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The bank ID provided to your casino.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>currency</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            ISO-3 currency code. The list of available currencies can be found in the Torrospin back office under the API section.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>quit_link</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The lobby URL you want the players to be redirected in case of game launch error.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>device</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The device where the game will be launced.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>lang</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            ISO-2 language code. The list of available currencies can
                            be found in the Torrospin back office under "Games" section.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>free_spin</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            The quantity of free spins to give to a player.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>hash</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            MD5 hashing of the request body. Hashing instructions is explained in the Developer Reference tab.
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Box>
                  <Code w={"100%"}>
                    <pre>{docs.requestLink.parameters}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Responses:</Text>
                <Text>201</Text>
                <Box>
                  <Code w={"100%"}>
                    <pre>
                      {docs.requestLink.responseSuccess}
                    </pre>
                  </Code>
                </Box>

                <Divider mt="10px" mb="10px" />
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={onOpen}
                >
                  Code Sample
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h1>
                <AccordionButton bg="blue.50">
                  <Box
                    display="flex"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    <Tag
                      colorScheme="teal"
                      variant="solid"
                      size="lg"
                    >
                      Post
                    </Tag>
                    <Text ml="20px" mt="6px">
                      /end-session
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h1>
              <AccordionPanel pb={4}>
                <Text as="b">Description:</Text>
                <Text>
                  For closing the session and removing free-spins provided to the player. This is called right after the closing of the game.
                </Text>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Headers:</Text>
                <Box w="100%">
                  <Code w={"100%"}>
                    <pre>{docs.addUser.headers}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Parameters:</Text>
                <TableContainer
                  mt="20px"
                  mb="20px"
                  borderWidth="1px"
                >
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>request_token</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            Your generated
                            unique token.
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>hash</Td>
                        <Td>
                          <Text
                            fontSize="12px"
                            color="red"
                          >
                            *Required
                          </Text>
                          <Text>
                            MD5 hashing of the request body. Hashing instructions is explained in the Developer Reference tab.
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Box>
                  <Code w={"100%"}>
                    <pre>{docs.gameClosed.parameters}</pre>
                  </Code>
                </Box>
                <Divider mt="10px" mb="10px" />
                <Text as="b">Responses:</Text>
                <Text>201</Text>
                <Box>
                  <Code w={"100%"}>
                    <pre>
                      {docs.gameClosed.responseSuccess}
                    </pre>
                  </Code>
                </Box>

                <Divider mt="10px" mb="10px" />
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={onOpen}
                >
                  Code Sample
                </Button>
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
              <pre>{sampleCode}</pre>
            </Code>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
