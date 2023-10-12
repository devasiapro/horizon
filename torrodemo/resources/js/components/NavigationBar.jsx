import React from 'react';
import {
  useNavigate
} from "react-router-dom";
import { 
  Box, 
  Text, 
  Button, 
  Spacer,
  ButtonGroup, 
  Divider, 
  Flex 
} from '@chakra-ui/react';


export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Flex 
        padding="20px" 
        minWidth="max-content" 
        alignItems="center"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
        >
          Torrodemo
        </Button> 
        <Spacer />
        <ButtonGroup gap="4">
          <Button 
            onClick={() => navigate('/guide')}
            variant="outline" 
            colorScheme="green"
          >
            Guide
          </Button>
          <Button 
            onClick={() => navigate('/login')}
            variant="outline" 
            colorScheme="green"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/register')}
            variant="outline" 
            colorScheme="green"
          >
            Register   
          </Button>
        </ButtonGroup>
      </Flex>
      <Divider />
    </div>
  );
};
