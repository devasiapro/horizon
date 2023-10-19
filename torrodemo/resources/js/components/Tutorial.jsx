import React from 'react';
import {
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList
} from '@chakra-ui/react';

export const Tutorial = () => {
  return (
    <React.Fragment>
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        Torrospin Integration Guide
      </Heading>

      <Text>
        Thank you for integrating with Torrospin. 
        Our aim is to have faster and stable integration that would allow you to
        deploy the games to your players in the shortest amount of time. This guide
        will help you from start to finish. If you have any questions, please feel
        free to message us.
      </Text>

      <OrderedList>
        <ListItem>
          Fill up the registration form here. 
          Please wait for 24 hours until you got confirmed.
        </ListItem>
        <ListItem>
          Once approved, you will received account info that 
          you will used for integration.
          <UnorderedList> 
            <ListItem>
              username and password: For access to back.torrospins.com.
            </ListItem>
            <ListItem>
              API KEY and SECRET KEY: For api call authentications.
            </ListItem>
            <ListItem>
              Bank ID: required parameters for some api calls.
            </ListItem>
          </UnorderedList> 
        </ListItem>
        <ListItem>
          This is an optional step. Login to https:\/\/back.torrospins.com. 
          In the sidebar, go to Casino and add yours.    
        </ListItem>
        <ListItem>
          Integrate the "/api/add/user" in your registration or for existing users.
          Everytime a new user registers, this API must be called to also register
          the user to Torrospin. Please check the reference here for detailed
          implementation.
        </ListItem>
        <ListItem>
          Use "/api/request_link/real" when clicking "Play" button in the games.
          Refer to this API reference for more details.
        </ListItem>
        <ListItem>
          Implement a callback hook to the wallet URL that you provided. The first
          implementation is for Request Balance. This will be used by Torrospin
          to check the player's balance. For more details, check the documentation
          here.
        </ListItem>
        <ListItem>
          Implement a callback hook for updating the player's balance. This is called
          for changes in user's balance based on his bets and winnings. 
          Please refer to the documenmtation here.
        </ListItem>
        <ListItem>
          All the steps up to this point should allow you to launch a playable game.
          There are other APIs and callback URLs that you should implement for full
          functionality. You can refer to the references of the API and Callback URLs
          for those.
        </ListItem>
      </OrderedList>
    </React.Fragment>
  );
};
