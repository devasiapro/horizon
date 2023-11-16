import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Box,
  Text, 
  Center,
  Button,
  Divider,
  Container,
  FormHelperText,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input
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
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [otherError, setOtherError] = useState('');
  const [authError, setAuthError] = useState('');

  const auth = useContext(AuthContext);
  const authHook = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setIsLoading(true);
      setErrors({});
      await axios.get(`${import.meta.env.VITE_APP_URL}/sanctum/csrf-cookie`);
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/login`, {
        'username': username,
        'password': password
      });
      authHook.setAsLogged(response.data.player, response.data.token);
      navigate('/');
    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else if (err.response.status === 401) {
        setAuthError('Username or password is not correct.');
      } else if (err.response.status === 500) {
        setOtherError(
          err.response.data && err.response.data.message ? 
          err.response.data.message : 
          'Internal error was encountered. Please report to the admins.'
        );
      } else {
        setOtherError('Internal error was encountered. Please report to the admins.');
      }
    } finally {
      setIsLoading(false);
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
        { otherError &&
          <Box mb="20px" borderWidth="1px" padding="10px">
            <FormControl isInvalid={otherError}>
              <FormErrorMessage>{otherError}</FormErrorMessage> 
            </FormControl>
          </Box>
        }

        <FormControl isInvalid={errors.username || authError}>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text" 
            onChange={ e => setUsername(e.target.value) }
          />
          { errors.username &&
            <FormErrorMessage>{errors.username[0]}</FormErrorMessage>
          }

          { authError &&
            <FormErrorMessage>{authError}</FormErrorMessage>
          }
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
          isLoading={isLoading}
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