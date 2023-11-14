import React from 'react';
import {
  Box,
  Text,
  Card,
  Grid,
  Container,
  GridItem,
  HStack,
  Flex,
  Icon, 
  CardBody,
  CardHeader,
  SimpleGrid,
  Circle,
  Tooltip
} from "@chakra-ui/react";

export const EarningGames = ({title, icon, games}) => {
  return (
    <Card color="horizon.300" boxShadow="lg" overflow={"hidden"} pb={2}> 
      <CardHeader bg={"horizon.300"} p={2} mb={3}>
        <Box position={"relative"}>
          <Grid templateColumns={"repeat(5, 1fr)"}>
            <GridItem colSpan={3}>
              <HStack>
                <Icon
                  as={icon}
                  boxSize={{ base: 4, sm: 4, md: 5, lg: 6 }}
                  ml={{ base: "2px", md: 2 }}
                  color={"white"}
                />
                <Text color={"white"}>
                  {title}
                </Text>
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      </CardHeader>
      <CardBody px={3} py={0}>
        <SimpleGrid columns={2} spacing={1}>
          <Container>
          {games.slice(0, 5).map((game, index) => {
            return (
              <Box
                key={game.game}
                bg={"horizon.100"}
                borderRadius={"50"}
                mb={"7px"}
              >
                <Flex align={"center"}>
                  <Circle size="25px" bg="horizon.300" color="white" ml={1}>
                    <Text fontSize={"10px"}>{ index + 1 }</Text>
                  </Circle>
                  <Tooltip label={game.game}>
                    <Box pl={1}>
                      <Text fontSize={"12px"} fontWeight={"800"}>
                        {game.game.slice(0, 15)}...
                      </Text>
                      <Text fontSize={"9px"}>
                        {
                          parseFloat(game.earnings)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      </Text>
                    </Box>
                  </Tooltip>
                </Flex>
              </Box>
            )  
          })}
          </Container>
          <Container>
          {games.slice(5, 10).map((game, index) => {
            return (
              <Box
                key={game.game}
                bg={"horizon.100"}
                borderRadius={"50"}
                mb={"7px"}
              >
                <Flex align={"center"}>
                  <Circle size="25px" bg="horizon.300" color="white" ml={1}>
                    <Text fontSize={"10px"}>{ index + 6 }</Text>
                  </Circle>
                  <Tooltip label={game.game}>
                    <Box pl={1}>
                      <Text fontSize={"12px"} fontWeight={"800"}>
                        {game.game.slice(0, 15)}...
                      </Text>
                      <Text fontSize={"9px"}>
                        {
                          parseFloat(game.earnings)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      </Text>
                    </Box>
                  </Tooltip>
                </Flex>
              </Box>
            )  
          })}
          </Container>
        </SimpleGrid>
      </CardBody>
    </Card> 
  ) 
}
