import React, { useState, useEffect } from 'react'; 
import {
  Flex,
  Spacer,
  Text,
  Button,
  Link,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement, 
  InputLeftAddon
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons'

export const Pagination = ({ setPage, page, pages, cb, total }) => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    cb(page);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex w="380px">
        <InputGroup size="md" mr="10px">
          <InputLeftAddon children='Page' />
          <Input 
            pr="4.5rem"
            bg={"white"}
            type="number" 
            onChange={(ev) => setPage(ev.target.value)}
            value={page}
          />
          <InputRightElement w="4.5rem">
            <Button 
              type="submit" 
              colorScheme="teal" 
              h="1.75rem" 
              sm="sm" 
              bg={"horizon.300"}
            >
              <ViewIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text pt="6px" w="300px">
          of <b>{pages}</b> - {total} items
        </Text>
      </Flex>
    </form>
  );
};
