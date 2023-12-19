import React from 'react';
import {
  Tooltip,
  Button
} from "@chakra-ui/react";

export const OutlineFormButton = ({ 
  toolTipText = null, 
  label = "Next", 
  isEnabled = true, 
  isLoading = false,
  onClick }) => {
  if (toolTipText) {
    return (
      <Tooltip
        hasArrow
        label={toolTipText}
        borderRadius={"8px"}
        isDisabled={isEnabled}
      >
        <Button
          variant="outline"
          isLoading={isLoading}
          mt={4}
          type="button"
          colorScheme="horizon"
          onClick={onClick}
          isDisabled={!isEnabled}
        >
          {label} 2
        </Button>
      </Tooltip>
    );
  } 

  return (
    <Button
      isLoading={isLoading}
      mt={4}
      type="button"
      colorScheme="horizon"
      onClick={onClick}
      isDisabled={!isEnabled}
    >
      {label}
    </Button>
  );
};
