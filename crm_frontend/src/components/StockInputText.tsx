import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  helperText
} from "@chakra-ui/react";

export const StockInputText = ({ label, formName, onChange, value, helperText = null }) => {
  return (
    <FormControl mb={3} variant={"horizon"}>
      <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>{label}</FormLabel>
      <Input
        size={["sm", "md"]}
        type="text"
        borderRadius={"8px"}
        bg={"horizon.150"}
        name={formName}
        onChange={onChange}
        value={value}
      />
      {helperText && <FormHelperText ml={"15px"}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
