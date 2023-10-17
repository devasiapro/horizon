import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
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
import { NavigationBar } from '../components/NavigationBar';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(AuthContext);
  const authHook = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_URL}/sanctum/csrf-cookie`);
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/login`, {
        'username': username,
        'password': password
      });
      authHook.setAsLogged(response.data.player, response.data.token);
      navigate('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <Center>
        <Text fontSize="4xl" mt="40px">Player Login { auth.token }</Text>
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
          onClick={() => login()}
          variant="outline" 
          colorScheme="green"
        >
          Login
        </Button>

      </Container>
      <Footer />
    </React.Fragment>
  );
};
