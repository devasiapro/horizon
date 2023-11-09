import React from 'react';
import {
  Tooltip,
  Button
} from "@chakra-ui/react";

export const StockFormButton = ({ toolTipText = null, label = "Next", isEnabled = true, onClick }) => {
  if (toolTipText) {
    return (
      <Tooltip
        hasArrow
        label={toolTipText}
        borderRadius={"8px"}
        isDisabled={isEnabled}
      >
        <Button
          mt={4}
          type="button"
          colorScheme="horizon"
          onClick={onClick}
          isDisabled={!isEnabled}
        >
          {label}
        </Button>
      </Tooltip>
    );
  } 

  return (
    <Button
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
