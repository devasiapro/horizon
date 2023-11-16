import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';
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
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { Footer } from '../components/Footer';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otherError, setOtherError] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const register = async () => {
    try {
      setNotificationMessage('');
      setOtherError('');
      setErrors({});
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/register`, {
        'username': username,
        'password': password
      });
      setNotificationMessage('You\'re registration was successful! Please try to login.');
    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
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
        <Text fontSize="4xl" mt="40px">Player Register</Text>
      </Center>
      <Container 
        padding="10px"
        mt="40px"
        maxW="2xl" 
        borderRadius="md" 
        borderWidth="2px"
      >
        { notificationMessage &&
          <Box 
            borderColor="green" 
            color="green" 
            mb="20px" 
            borderRadius="md" 
            borderWidth="1px" 
            padding="10px"
          >
            {notificationMessage}
          </Box>
        }

        { otherError &&
          <Box mb="20px" borderWidth="1px" padding="10px">
            <FormControl isInvalid={otherError}>
              <FormErrorMessage>{otherError}</FormErrorMessage> 
            </FormControl>
          </Box>
        }

        <FormControl isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text" 
            onChange={ e => setUsername(e.target.value) }
          />
          { errors.username &&
            <FormErrorMessage>{errors.username[0]}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.password} mt="20px">
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            onChange={ e => setPassword(e.target.value) }
          />
          { errors.password &&
            <FormErrorMessage>{errors.password[0]}</FormErrorMessage>
          }
        </FormControl>

        <Divider mt="20px" mb="20px" />

        <Button 
          isLoading={isLoading}
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