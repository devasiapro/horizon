import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Text,
  InputGroup,
  InputLeftElement,
  Center,
  Heading,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import axios, { AxiosResponse, AxiosError } from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';
import { ErrorForm, ErrorFormDetail } from '../interfaces/ErrorForm';

const horizonLogo = "https://sys-stg.horizon88.com/img/horizon-logo.png";
const backgroundImage = "https://sys-stg.horizon88.com/img/login.jpg";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFormMessages, setErrorFormMessages] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const authHook = useAuthHook();
  const navigate = useNavigate();

  const handleSubmit = async (event): void => {
    event.preventDefault();
    setErrorMessage('');
    setErrorFormMessages({
      username: '',
      password: ''
    });
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { 
        username, password 
      });
      authHook.setAsLogged(response.data.user, response.data.token);
      navigate('/');
    } catch (err: AxiosError) {
      if (err.response?.status === 401) {
        setErrorMessage('Invalid username or password.');
      } else if (err.response?.status === 422) {
        const errorForms: ErrorForm = err.response.data;
        errorForms.detail.forEach(errorForm => {
          const temp = errorFormMessages;
          temp[errorForm.loc[1]] = errorForm.msg
          setErrorFormMessages(temp);
        });
      } else {
        setErrorMessage('Error encountered: ' + JSON.stringify(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Image
        src={backgroundImage}
        alt="Image"
        objectFit="cover"
        width="100%"
        height="100%"
      />

      <Box
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        borderRadius={"20px"}
        bg={"whiteAlpha.800"}
        minWidth={"300px"}
        maxWidth={"400px"}
        p={6}
      >
        <Image
          src={horizonLogo}
          alt="Horizon Image"
          mt={10}
          mb={{ base: 6, sm: 6, md: 8, lg: 10 }}
        />
        <Center>
          <Heading size="md" color={"horizon.300"} fontWeight={800}>
            Sign in to your account
          </Heading>
        </Center>

        <Box>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert status="error" aria-live="assertive" mt={3}>
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <FormControl mb={3} isInvalid={errorFormMessages.username}>
              <InputGroup mt={8}>
                <InputLeftElement pointerEvents="none" ml={1}>
                  <EmailIcon color="horizon.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  borderRadius={"20px"}
                  placeholder="Username"
                  color={"horizon.300"}
                  fontWeight={800}
                  bg={"horizon.50"}
                  focusBorderColor="horizon.300"
                />
              </InputGroup>
              <FormErrorMessage>{errorFormMessages.username}</FormErrorMessage>
            </FormControl>
            <FormControl mb={3} isInvalid={errorFormMessages.password}>
              <InputGroup mt={3}>
                <InputLeftElement pointerEvents="none" ml={1}>
                  <LockIcon color="horizon.300" />
                </InputLeftElement>
                <Input
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  borderRadius={"20px"}
                  placeholder="Password"
                  color={"horizon.300"}
                  fontWeight={800}
                  bg={"horizon.50"}
                  focusBorderColor="horizon.300"
                />
              </InputGroup>
              <FormErrorMessage>{errorFormMessages.password}</FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="teal"
              my={2}
              textAlign="left"
              width={"100%"}
              borderRadius={"20px"}
              bg={"horizon.300"}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
