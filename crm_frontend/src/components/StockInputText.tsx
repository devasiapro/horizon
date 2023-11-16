import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  helperText
} from "@chakra-ui/react";

export const StockInputText = ({ 
  label, 
  formName, 
  onChange, 
  value, 
  helperText = null, 
  errorMessage = null,
  placeholder = null
}) => {
  return (
    <FormControl mb={3} variant={"horizon"} isInvalid={errorMessage}>
      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>{label}</FormLabel>
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
      {helperText && <FormHelperText ml={"15px"}>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
