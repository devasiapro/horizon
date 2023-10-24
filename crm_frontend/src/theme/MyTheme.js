import '@fontsource/montserrat';
import { extendTheme } from "@chakra-ui/react";
import { Tabs } from "./components/Tabs.js";
import { tableTheme } from "./components/Table.js";
import { MyStyles } from "./MyStyles.js";
import { statTheme } from "./components/Stat.js"
import { stepperTheme } from "./components/Stepper.js"
import { inputTheme } from "./components/Input.js"

export const MyTheme = extendTheme({
    colors: {
        horizon: {
            900: "#374A16",
            800: "#374A16",
            700: "#374A16",
            600: "#374A16",
            500: "#374A16",
            400: "#374A16",
            300: "#374A16",
            200: "#96C93C",
            100: "#ECF1E3",
            50: "#D1DDB5",
        },
    },
    components: {
        Tabs: Tabs,
        Stat: statTheme,
        Stepper: stepperTheme,
        Input: inputTheme
    },

    fonts: {
        body: "Montserrat, sans-serif",
        heading: "Montserrat, sans-serif",
        mono: "Montserrat, sans-serif",
    },

    fontSizes: MyStyles.fontSizes,
    fontWeights: MyStyles.fontWeights,
    lineHeights: MyStyles.lineHeights,
    letterSpacings: MyStyles.letterSpacings,

    breakpoints: {
        sm: '575px',
        md: '767px',
        lg: '991px',
        xl: '1199px',
        '2xl': '1535px',
    }
})
