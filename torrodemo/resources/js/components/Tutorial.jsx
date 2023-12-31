import React from 'react';
import {
  Box,
  Text,
  VStack,
  Center,
  Card,
  CardBody,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Link
} from '@chakra-ui/react';

export const Tutorial = () => {
  return (
    <React.Fragment>
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        Torrospin Integration Guide
      </Heading>

      <Center>
      <Box p="20px" maxW="1024px" borderRadius="md" borderWidth="1px">
        <VStack mb="20px" align='justify'>
          <Text>
            Thank you for integrating with Torrospin. 
            Our aim is to have faster and stable integration that would allow you to
            deploy the games to your players in the shortest amount of time. This guide
            will help you from start to finish.
          </Text>
          
          <Text align='justify'>
            If you have any questions, please feel free to message us
          </Text>
        </VStack>

        <OrderedList>
          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                  Fill up the registration form here. 
                  Please wait 24 hours or sooner until you're confirmed.
                </Text>
              </CardBody>
            </Card>
          </ListItem>

          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                  Once approved, you will received account info that 
                  you will use for integration.
                </Text>
                <UnorderedList> 
                  <ListItem>
                    <Text>
                    username and password: For access to back.torrospins.com.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                    API KEY and SECRET KEY: For api call authentications.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                    Bank ID: required parameters for some api calls.
                    </Text>
                  </ListItem>
                </UnorderedList> 
              </CardBody>
            </Card>
          </ListItem>

          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                This is an optional step. Login to Torrospin staging back office <Link href="https://back.torrospins.com" color={'blue'}>https://back.torrospins.com</Link>. 
                In the sidebar, go to Casino and add your sub-casino if needed.    
                </Text>
              </CardBody>
            </Card>
          </ListItem>

          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Integrate the <b>"/api/add/user"</b> in your registration or for existing users.
                Everytime a new user registers, this API must be called to also register
                the user to Torrospin. Please check the reference here for detailed
                implementation.
                </Text>
              </CardBody>
            </Card>
          </ListItem>

          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Use <b>"/api/request_link/real"</b> when clicking "Play" button in the games.
                Refer to this API reference for more details. 
                </Text>
              </CardBody>
            </Card>
          </ListItem>

          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Implement a callback hook to the wallet URL that you provided. The first
                implementation is for <b>Request Balance</b>. This will be used by Torrospin
                to check the player's balance. For more details, check the documentation
                here.
                </Text>
              </CardBody>
            </Card>
          </ListItem>
    
          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Implement a callback hook for <b>Update Balance</b>. This is called
                for changes in user's balance based on his bets and winnings. 
                Please refer to the documenmtation here.
                </Text>
              </CardBody>
            </Card>
          </ListItem>
          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Implement a callback hook for <b>Refund Balance</b>. This is called 
                in times of technical issues in the game server. The wallet must refund the failed bet
                of the player. Please refer to the documentation here.
                </Text>
              </CardBody>
            </Card>
          </ListItem>
          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                Implement a callback hook for <b>Transfer Funds</b>. This is called 
                whenever there is a wagering requirements for free spins. The wallet 
                must receive the request and update the balacne of the player. 
                Please refer to the documentation here.
                </Text>
              </CardBody>
            </Card>
          </ListItem>
          <ListItem mb="20px">
            <Card>
              <CardBody>
                <Text>
                All the steps up to this point should allow you to launch a playable game.
                There are other APIs and callback URLs that you should implement for full
                functionality. You can refer to the references of the API and Callback URLs
                for those.
                </Text>
              </CardBody>
            </Card>
          </ListItem>
        </OrderedList>
      </Box>
      </Center>
    </React.Fragment>
  );
};
