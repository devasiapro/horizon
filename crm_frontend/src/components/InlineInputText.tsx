import React, { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  helperText,
  Skeleton
} from "@chakra-ui/react";
import { IsGlobalLoadingContext } from '../context/IsGlobalLoadingContext';

export const InlineInputText = ({ 
  label, 
  formName, 
  onChange, 
  value, 
  helperText = null, 
  errorMessage = null,
  placeholder = null,
  isDisabled = false,
}) => {
  const isGlobalLoading = useContext(IsGlobalLoadingContext);

  return (
    <FormControl mb={3} variant={"horizon"} isInvalid={errorMessage}>
      <Skeleton isLoaded={!isGlobalLoading.isGlobalLoading}>
        <InputGroup>
          <InputLeftAddon bg={'#EAF4D8'} children={`${label} :`} />
          <Input
            type="text"
            border={'0.5px'}
            borderColor={'#374A16'}
            bg={"#EAF4D8"}
            name={formName}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
          />
        </InputGroup>
      </Skeleton>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
