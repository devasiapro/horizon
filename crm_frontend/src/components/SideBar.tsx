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
          {/*
          <ListItem>
            <Accordion boxShadow="none" allowToggle>
              <AccordionItem
                borderWidth="0"
                borderBlockEnd={0}
                boxShadow="none"
              >
                <AccordionButton
                  boxShadow="none"
                  _hover={{ bg: "horizon.100" }}
                  borderRadius={"20px"}
                >
                  <HStack pr={2}>
                    <Box
                      as={BankIcon}
                      boxSize={{ sm: 4, md: 5 }}
                      mb={"6px"}
                    />
                    <Heading
                      size={{ sm: "xs", md: "sm" }}
                      pl={{ sm: 0, md: 1 }}
                    >
                      Customer
                    </Heading>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel mt={0} mb={0} pb={0} pl={4}>
                  <VStack
                    borderWidth="0"
                    borderRadius="md"
                    boxShadow="none"
                    alignItems="flex-start"
                    spacing={"5px"}
                  >
                    <Link
                      as={ReactRouterLink}
                      to="/addnew"
                      _hover={
                        isActive("/addnew") || isActive("/addnew/submitted")
                          ? { bg: "horizon.300" }
                          : { bg: "horizon.100" }
                      }
                      _active={{ bg: "horizon.300", color: "white" }}
                      bg={
                        isActive("/addnew") || isActive("/addnew/submitted")
                          ? "horizon.300"
                          : "transparent"
                      }
                      color={
                        isActive("/addnew") || isActive("/addnew/submitted")
                          ? "white"
                          : "horizon.300"
                      }
                      px={3}
                      py={2}
                      borderRadius={"20px"}
                    >
                      <HStack justifyContent="space-between" spacing={3}>
                        <Heading
                          // size={{ sm: "xs", md: "md" }}
                          fontSize={{ sm: "13px", md: "14px" }}
                          pl={{ sm: 0, md: 1 }}
                        >
                          <HStack>
                            <Box
                              as={UpDownIcon}
                              boxSize={{ sm: "13px", md: "14px" }}
                              mb={1}
                            />
                            <Text>Add New</Text>
                          </HStack>
                        </Heading>
                      </HStack>
                    </Link>
                    <Link
                      as={ReactRouterLink}
                      to="/viewpage"
                      _hover={
                        isActive("/viewpage")
                          ? { bg: "horizon.300" }
                          : { bg: "horizon.100" }
                      }
                      _active={{ bg: "horizon.300", color: "white" }}
                      bg={
                        isActive("/viewpage") ? "horizon.300" : "transparent"
                      }
                      color={isActive("/viewpage") ? "white" : "horizon.300"}
                      px={3}
                      py={2}
                      borderRadius={"20px"}
                    >
                      <HStack justifyContent="space-between" spacing={3}>
                        <Heading
                          fontSize={{ sm: "13px", md: "14px" }}
                          // size={{ sm: "xs", md: "sm" }}
                          pl={{ sm: 0, md: 1 }}
                        >
                          <HStack>
                            <Box
                              as={View}
                              boxSize={{ sm: "13px", md: "14px" }}
                              mb={1}
                            />
                            <Text>View</Text>
                          </HStack>
                        </Heading>
                      </HStack>
                    </Link>
                    <Link
                      as={ReactRouterLink}
                      to="/editcustomer"
                      _hover={
                        isActive("/editcustomer")
                          ? { bg: "horizon.300" }
                          : { bg: "horizon.100" }
                      }
                      _active={{ bg: "horizon.300", color: "white" }}
                      bg={
                        isActive("/editcustomer")
                          ? "horizon.300"
                          : "transparent"
                      }
                      color={
                        isActive("/editcustomer") ? "white" : "horizon.300"
                      }
                      px={3}
                      py={2}
                      borderRadius={"20px"}
                    >
                      <HStack justifyContent="space-between" spacing={3}>
                        <Heading
                          fontSize={{ sm: "13px", md: "14px" }}
                          // size={{ sm: "xs", md: "sm" }}
                          pl={{ sm: 0, md: 1 }}
                        >
                          <HStack>
                            <Box
                              as={Pencil}
                              boxSize={{ sm: "13px", md: "14px" }}
                              mb={1}
                            />
                            <Text>Edit</Text>
                          </HStack>
                        </Heading>
                      </HStack>
                    </Link>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ListItem>

          <ListItem
            _hover={
              isActive("/billing")
                ? { bg: "horizon.300" }
                : { bg: "horizon.100" }
            }
            _active={{ bg: "horizon.300", color: "white" }}
            bg={isActive("/billing") ? "horizon.300" : "transparent"}
            color={isActive("/billing") ? "white" : "horizon.300"}
            px={4}
            py={2}
            borderRadius={"20px"}
            width={{ sm: "150px", md: "160px", lg: "170px" }}
          >
            <Link as={ReactRouterLink} to="/billing">
              <HStack>
                <Box as={Folder} boxSize={{ sm: 4, md: 5 }} mb={"6px"} />
                <Heading size={{ sm: "xs", md: "sm" }} pl={{ sm: 0, md: 1 }}>
                  Billing
                </Heading>
              </HStack>
            </Link>
          </ListItem>

          <ListItem
            _hover={
              isActive("/support")
                ? { bg: "horizon.300" }
                : { bg: "horizon.100" }
            }
            _active={{ bg: "horizon.300", color: "white" }}
            bg={isActive("/support") ? "horizon.300" : "transparent"}
            color={isActive("/support") ? "white" : "horizon.300"}
            px={4}
            py={2}
            borderRadius={"20px"}
            width={{ sm: "150px", md: "160px", lg: "170px" }}
          >
            <Link as={ReactRouterLink} to="/support">
              <HStack>
                <Box as={UserSquare} boxSize={{ sm: 4, md: 5 }} mb={"6px"} />

                <Heading size={{ sm: "xs", md: "sm" }} pl={{ sm: 0, md: 1 }}>
                  Support
                </Heading>
              </HStack>
            </Link>
          </ListItem>

          <ListItem
            _hover={
              isActive("/settings")
                ? { bg: "horizon.300" }
                : { bg: "horizon.100" }
            }
            _active={{ bg: "horizon.300", color: "white" }}
            bg={isActive("/settings") ? "horizon.300" : "transparent"}
            color={isActive("/settings") ? "white" : "horizon.300"}
            px={4}
            py={2}
            borderRadius={"20px"}
            width={{ sm: "150px", md: "160px", lg: "170px" }}
          >
            <Link as={ReactRouterLink} to="/settings">
              <HStack>
                <Box as={Setting} boxSize={{ sm: 4, md: 5 }} mb={"6px"} />
                <Heading size={{ sm: "xs", md: "sm" }} pl={{ sm: 0, md: 1 }}>
                  Settings
                </Heading>
              </HStack>
            </Link>
          </ListItem>
          */}
        </List>
      </Center>
    </Box>
  );
};
