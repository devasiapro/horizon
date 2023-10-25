import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';

const horizonLogo = "https://sys-stg.horizon88.com/img/horizon-logo.png";
const backgroundImage = "https://sys-stg.horizon88.com/img/login.jpg";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authHook = useAuthHook();
  const navigate = useNavigate();

  const handleSubmit = async (event): void => {
    event.preventDefault() 
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { 
        email, password 
      });
      authHook.setAsLogged(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      console.log('err', err);
    } finally {

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
            <FormControl>
              <InputGroup mt={8}>
                <InputLeftElement pointerEvents="none" ml={1}>
                  <EmailIcon color="horizon.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  borderRadius={"20px"}
                  mb={3}
                  placeholder="Username"
                  color={"horizon.300"}
                  fontWeight={800}
                  bg={"horizon.50"}
                  focusBorderColor="horizon.300"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
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
                  required
                  borderRadius={"20px"}
                  mb={3}
                  placeholder="Password"
                  color={"horizon.300"}
                  fontWeight={800}
                  bg={"horizon.50"}
                  focusBorderColor="horizon.300"
                />
              </InputGroup>
            </FormControl>
            {errorMessage && (
              <Alert status="error" ref={errRef} aria-live="assertive" mt={3}>
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <Button
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
