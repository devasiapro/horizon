import { inputAnatomy } from "@chakra-ui/anatomy";
import {
  background,
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

export const inputTheme = defineMultiStyleConfig({
  sizes: {
    sm: definePartsStyle({
      field: {
        fontSize: "14px",
        px: "4",
        borderRadius: "8px",
        // h: '12',
      },
      addon: {
        fontSize: "14px",
        px: "4",
        borderRadius: "8px",
      },
      element: {
        fontSize: "14px",
        px: "4",
        borderRadius: "8px",
      },
    }),
    md: definePartsStyle({
      field: {
        fontSize: "16px",
        px: "4",
        borderRadius: "8px",
      },
      addon: {
        fontSize: "16px",
        px: "4",
        borderRadius: "8px",
      },
      element: {
        fontSize: "16px",
        px: "4",
        borderRadius: "8px",
      },
    }),
  },
  variants: {
    upload: definePartsStyle({
      field: {
        fontSize: "16px",
        px: "4",
      },
      addon: {
        fontSize: "16px",
        px: "4",
      },
      element: {
        fontSize: "16px",
        px: "4",
        borderRadius: "8px",
      },
    }),
  },
});
