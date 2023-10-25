import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Grid, 
  GridItem, 
  Show 
} from "@chakra-ui/react";

import { SideBar } from '../components/SideBar';
import { NavBar } from '../components/NavBar';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Grid
        templateAreas={{
          base: `"navBar"
                "main"
                "lowBar"`,
          sm: `"sideBar navBar"
              "sideBar main"`,
        }}
        gridTemplateColumns={{
          sm: "180px 1fr",
          md: "200px 1fr",
          lg: "250px 1fr",
        }}
        gridTemplateRows={{ base: "48px 1fr 50px", sm: "85px 1fr" }}
        minHeight={"100vh"}
      >
        <Show above="sm">
          <GridItem bg={"whiteAlpha.20"} area={"sideBar"} zIndex={3}>
            <SideBar />
          </GridItem>
        </Show>

        <GridItem area={"navBar"} zIndex={2}>
          <NavBar />
        </GridItem>

        <GridItem bg="horizon.100" area={"main"} as={"main"} px={0}>
          {children}  
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};
