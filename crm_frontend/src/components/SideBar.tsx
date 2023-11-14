import React from 'react';
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import {
  VStack,
  Link,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Heading,
  Image,
  Spacer,
  Divider,
  Center,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import horizonLogo from "../../public/images/horizon-logo.png";
import {
  HorizonLogo,
  Home,
  BankIcon,
  UpDownIcon,
  View,
  Pencil,
  Folder,
  UserSquare,
  Setting,
} from "../assets/logo/icons";

export const SideBar = () => {
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      position="sticky"
      top={0}
      bg="#FFFFFF"
      zIndex={2}
      color={"horizon.300"}
    >
      <Center height={"85px"} zIndex={3}>
        <Box
          as={HorizonLogo}
          width={{ base: "150px", md: "170px", lg: "220px" }}
          height="auto"
        />
      </Center>
      <Box pl={4} pr={4} mb={3}>
        <Divider borderWidth={2} borderColor={"horizon.300"} />
      </Box>
      <br />
      <Center width={{ sm: "180", md: "200px", lg: "250px" }}>
        <List spacing={4} pl={{ sm: 2, md: 0 }}>
          <ListItem
            _hover={
              isActive("/") ? { bg: "horizon.300" } : { bg: "horizon.100" }
            }
            _active={{ bg: "horizon.300", color: "white" }}
            bg={isActive("/") ? "horizon.300" : "transparent"}
            color={isActive("/") ? "white" : "horizon.300"}
            px={4}
            py={2}
            borderRadius={"20px"}
            width={{ sm: "150px", md: "160px", lg: "170px" }}
        >
            <Link as={ReactRouterLink} to="/">
              <HStack>
                <Box as={Home} boxSize={{ sm: 4, md: 5 }} mb={"6px"} />
                <Heading size={{ sm: "xs", md: "sm" }} pl={{ sm: 0, md: 1 }}>
                  Dashboard
                </Heading>
              </HStack>
            </Link>
          </ListItem>
          <ListItem
            _hover={
              isActive("/customer") ? { bg: "horizon.300" } : { bg: "horizon.100" }
            }
            _active={{ bg: "horizon.300", color: "white" }}
            bg={isActive("/customer") ? "horizon.300" : "transparent"}
            color={isActive("/customer") ? "white" : "horizon.300"}
            px={4}
            py={2}
            borderRadius={"20px"}
            width={{ sm: "150px", md: "160px", lg: "170px" }}
        >
            <Link as={ReactRouterLink} to="/customer">
              <HStack>
                <Box as={BankIcon} boxSize={{ sm: 4, md: 5 }} mb={"6px"} />
                <Heading size={{ sm: "xs", md: "sm" }} pl={{ sm: 0, md: 1 }}>
                  Customers
                </Heading>
              </HStack>
            </Link>
          </ListItem>
        </List>
      </Center>
    </Box>
  );
};
