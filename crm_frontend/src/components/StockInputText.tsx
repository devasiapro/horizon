import React, { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  helperText,
  Skeleton
} from "@chakra-ui/react";
import { IsGlobalLoadingContext } from '../context/IsGlobalLoadingContext';

export const StockInputText = ({ 
  label, 
  formName, 
  onChange, 
  value, 
  helperText = null, 
  errorMessage = null,
  placeholder = null,
}) => {
  const isGlobalLoading = useContext(IsGlobalLoadingContext);

  return (
    <FormControl mb={3} variant={"horizon"} isInvalid={errorMessage}>
      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>{label}</FormLabel>
      <Skeleton isLoaded={!isGlobalLoading.isGlobalLoading}>
        <Input
          size={["sm", "md"]}
          type="text"
          borderRadius={"8px"}
          bg={"horizon.150"}
          name={formName}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </Skeleton>
      {helperText && <FormHelperText ml={"15px"}>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
