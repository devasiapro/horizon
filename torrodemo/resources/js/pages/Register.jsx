import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { 
  Box,
  Text, 
  Center,
  Button,
  Divider,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react';
import axios from 'axios';
import { Footer } from '../components/Footer';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/register`, {
        'username': username,
        'password': password
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <Center>
        <Text fontSize="4xl" mt="40px">Player Register</Text>
      </Center>
      <Container 
        padding="10px"
        mt="40px"
        maxW="2xl" 
        borderRadius="md" 
        borderWidth="2px"
      >

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text" 
            onChange={ e => setUsername(e.target.value) }
          />
        </FormControl>

        <FormControl mt="20px">
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            onChange={ e => setPassword(e.target.value) }
          />
        </FormControl>

        <Divider mt="20px" mb="20px" />

        <Button 
          onClick={() => register()}
          variant="outline" 
          colorScheme="green"
        >
          Register
        </Button>

      </Container>
      <Footer />
    </React.Fragment>
  );
};
