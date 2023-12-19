import React, { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Show,
  Center,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from 'axios';
import horizonLogo from "../../public/images/horizon-logo.png";
import { UserCircle } from "../assets/logo/icons";
import { useAuthHook } from "../hooks/useAuthHook";

export const NavBar = () => {
  const navigate = useNavigate();
  const useAuth = useAuthHook();

  const handleLogout = async () => {
    try {
      const cookie = new Cookies();
      const token = cookie.get('token');

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      useAuth.logout();
      navigate('/login');
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left={{ base: 0, sm: "180px", md: "200px", lg: "250px" }}
      bg="#FFFFFF"
      color={"horizon.300"}
      zIndex={1}
      borderBottom="1px"
      borderColor="#374A16"
    >
      <Box position="relative">
        <Flex align={"center"} h={"85px"}>

          <Show below="sm">
            <Center height={{ base: "48px", sm: "70px" }}>
              <Image
                src={horizonLogo}
                height={{ base: "20px", sm: "25px" }}
                width={"150px"}
              />
            </Center>
          </Show>

          <Spacer></Spacer>
          <HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<UserCircle />}
                variant="outline"
                color="horizon.300"
                borderWidth={0}
                fontSize={{ base: "18px", sm: "26px" }}
                mr={3}
              />
              <MenuList>
                <MenuItem onClick={handleLogout}>
                  <Button
                    as={ReactRouterLink}
                    variant="link"
                  >
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
