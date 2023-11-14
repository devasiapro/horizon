import { statAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(statAnatomy.keys)

export const statTheme = defineMultiStyleConfig({
    sizes: {
        xs: definePartsStyle({
            label: { fontSize: "10px" },
            helpText: { fontSize: "10px" },
            number: { fontSize: "16px" },
        }),
        sm: definePartsStyle({
            label: { fontSize: "12px" },
            helpText: { fontSize: "10px" },
            number: { fontSize: "16px" },
        }),
        md: definePartsStyle({
            label: { fontSize: "14px" },
            helpText: { fontSize: "12px" },
            number: { fontSize: "20px" },
        }),
        lg: definePartsStyle({
            label: { fontSize: "16px" },
            helpText: { fontSize: "14px" },
            number: { fontSize: "24px" },
        }),
    }
})