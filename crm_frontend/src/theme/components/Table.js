import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  ['thead', 'tbody', 'tr', 'th', 'td']
);


export const tableTheme = defineMultiStyleConfig({
    baseStyle: {
        table: {
            borderCollapse: "collapse",
            width: "100%",
        },
        th: {
            fontSize: '16px',
        },
        td: {
            fontSize: '16px',
        },
    },
    sizes: {
        sm: {
            tablist: {
                fontSize: 'xl',
                py: '4',
                px: '6',
            },
            tab: {
                fontSize: 'xl',
                py: '4',
                px: '6',
            },
            tabpanel: {
                py: '4',
                px: '6',
            },
        },
        md: {
            tablist: {
                fontSize: 'xl',
                py: '4',
                px: '6',
            },
            tab: {
                fontSize: 'xl',
                py: '4',
                px: '6',
            },
            tabpanel: {
                py: '4',
                px: '6',
            },
        },
    },
    defaultProps: { },
});
