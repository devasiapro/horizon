import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tabsAnatomy.keys
);

export const Tabs = defineMultiStyleConfig({
  baseStyle: {
    tablist: {
      px: "5",
      fontWeight: 500,
    },
    tab: {
      px: "3",
      fontWeight: 500,
    },
  },
  sizes: {
    base: {
      tab: {
        // fontSize: '10px',
        fontSize: "16px",
        px: "3px",
        py: "8px",
        mx: "0px",
      },
      tablist: {
        fontSize: "16px",
        px: "5px",
      },
      tabpanel: {
        fontSize: "14px",
        py: "1",
        px: "1",
      },
    },
    sm: {
      tab: {
        fontSize: "16px",
      },
      tablist: {
        fontSize: "16px",
      },
      tabpanel: {
        fontSize: "14px",
        py: "1",
        px: "1",
      },
    },
    md: {
      tab: {
        fontSize: "16px",
      },
      tablist: {
        fontSize: "16px",
      },
      tabpanel: {
        fontSize: "14px",
        py: "3",
        px: "4",
      },
    },
    lg: {
      tab: {
        fontSize: "18px",
      },
      tablist: {
        fontSize: "18px",
      },
      tabpanel: {
        fontSize: "16px",
        py: "4",
        px: "6",
      },
    },
  },
  variants: {
    colorful: {
      tab: {
        height: { base: "38px", sm: "41px" },
        fontWeight: 100,
        fontSize: { base: "14px", sm: "14px", md: "14px", lg: "16px" },

        _selected: {
          fontSize: { base: "15px", sm: "15px", md: "16px", lg: "18px" },
          fontWeight: 900,
          color: "#374A16",
          boxShadow: "0px 4px 0px #96C93C",
          mb: "2px",
        },
      },
      tablist: {
        bg: "white",
        position: "sticky",
        top: { base: "45px", sm: "70px" },
        left: 0,
        right: 0,
        width: "auto",
        zIndex: 1,
        // ##
        borderBottom: "2px",
        borderColor: "#374A16",
        height: { base: "41px", sm: "44px" },
      },
      tabpanel: {
        px: 0,
        fontSize: { base: "sm", sm: "sm", md: "md", lg: "md" },
      },
    },
    customer: {
      tab: {
        height: { base: "38px", sm: "41px" },
        _selected: {
          fontSize: { base: "15px", sm: "15px", md: "16px", lg: "18px" },
          fontWeight: 900,
          color: "#374A16",
          boxShadow: "0px 4px 0px #96C93C",
          mb: "2px",
        },
      },
      tablist: {
        borderBottom: "2px",
        borderColor: "#374A16",
      },
      tabpanel: {
        px: { base: "2", sm: "3", md: "4", lg: "5" },
        fontSize: { base: "sm", sm: "sm", md: "md", lg: "md" },
      },
    },
  },
  defaultProps: {
    variant: "colorful",
    colorScheme: "green",
  },
});
