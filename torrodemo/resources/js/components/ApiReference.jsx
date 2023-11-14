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
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
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
    "hash": "hashhere"
}
      `,
      responseSuccess: `
{
  "casino_user_id": "casinouserid",
  "username": "casinouser"
}
`
    },

    requestlinkReal: {
      headers:`
        'Content-Type' : 'application/json'
        'X-Api-Key' : API_KEY_HERE
      `,

      parameters:`
      {
        "token":"exampleToken123123",
        "game_name":"arc",
        "user_id":"exampleplayer",
        "bank_id":"Casino_USD",
        "currency":"USD",
        "quit_link":"https://yourlobby.example.com",
        "device":"desktop",
        "lang":"en",
        "free_spin":0,
        "lobby":"True",
        "hash":"0174191354994ebf4cc545cd4b525119"
    }
      `,
      responsesSuccess:`
      {
        "message":"URL was created.",
        "success":true,
        "url":"https:\/\/examplelauncher.torrospin.eu\/GameLauncher?gameCodeName=arc&username=exampleplayer&externalToken=exampleToken123123&casino=ptstaging3.33&clientType=casino&clientPlatform=web&language=EN&playMode=1&lobbyUrl=https:\/\/yourlobby.example.com\/quit-link",
        "token": "exampletoken123qweasdzxc"
        "status": 200
      }
      `

    }
  };

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
              <Text>
                <Code>
                  <pre>
                    { docs.addUser.headers }
                  </pre>
                </Code>
              </Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Parameters:</Text>
              <TableContainer mt="20px" mb="20px" borderWidth="1px">
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
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Your generated 8 character unique name.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Username</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          The username used in login.
                        </Text>
                      </Td>   
                    </Tr>
                    <Tr>
                      <Td>Hash</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Generated hash key. Please refer to the Developer Reference on
                          how to generate a hash key.
                        </Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Text>
                <Code>
                  <pre>
                    { docs.addUser.parameters }
                  </pre>
                </Code>
              </Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Responses:</Text>
              <Text>201</Text>
              <Text>
                <Code>
                  <pre>
                    { docs.addUser.responseSuccess }
                  </pre>
                </Code>
              </Text>
              
              <Divider mt="10px" mb="10px"/> 
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
                <Box display="flex" as="span" flex="1" textAlign="left">
                  <Tag colorScheme="teal" variant="solid" size="lg">
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
              <Text> Generate URL to redirect or open a new window for a player access specific game. This API will be called after clicking the "play" button on a specific game in this platform. </Text>

              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Headers:</Text>
              <Text>
                <Code>
                  <pre>
                    { docs.requestlinkReal.headers }
                  </pre>
                </Code>
              </Text>
              <Divider mt="10px" mb="10px"/>
              <Text as="b">Parameters:</Text>
              <TableContainer mt="20px" mb="20px" borderWidth="1px">
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
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Your generated token.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>game_name</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Specific game code of a game. For slot game, you must pass the "launch code" of a game.<br/> Example, Buffalo Blitz = "bfb".<br/><br/>To launch a live game, you must pass the "Game Type Code"  + ";" + "Alias".<br/> Example, Live Baccarat = "ubal;bal_baccarat1".
                        </Text>
                      </Td>   
                    </Tr>
                    <Tr>
                      <Td>user_id</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                        Your generated 8 character unique name.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>bank_id</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Generated and Assigned bank_id to your casino.<br/>
                          Will be given by the one who created your entity in seamless platform.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>currency</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Currency code. For Ex. CNY or MYR.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>quit_link</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Quit link where the player will be redirect once he exits the game.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>device</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                          Identifier whether the player plays on desktop or mobile
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>lang</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                         Language code. For example : EN
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>free_spin</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                         Number of freespin assigned to the player.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>lobby</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                         Boolean value, Could be true or false. If it's true, once the player clicks a live game.<br/> It will be redirected to the lobby. But if false and the game alias is passed.<br/> It will be redirected to the actual live game itself.
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>hash</Td>
                      <Td>
                        <Text fontSize="12px" color="red">*Required</Text>
                        <Text>
                        Generated hash key. Please refer to the Developer Reference on how to generate a hash key.
                        </Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Text>
                <Code>
                  <pre>
                    { docs.requestlinkReal.parameters }
                  </pre>
                </Code>
              </Text>
              <Divider mt="10px" mb="10px"/> 
              <Text as="b">Responses:</Text>
              <Text>201</Text>
              <Text>
                <Code>
                  <pre>
                    { docs.requestlinkReal.responsesSuccess }
                  </pre>
                </Code>
              </Text>


            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h1>
              <AccordionButton bg="blue.50">
                <Box display="flex" as="span" flex="1" textAlign="left">
                  <Tag colorScheme="teal" variant="solid" size="lg">
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
