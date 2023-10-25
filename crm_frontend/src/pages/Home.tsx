import React from 'react';
import { Box } from "@chakra-ui/react";

import { useAuthHook } from '../hooks/useAuthHook';

export const Home = () => {
  const authHook = useAuthHook();

  return (
    <Box mx={6} mt={8} mb={8}>
      Home
    </Box>
  );
};
