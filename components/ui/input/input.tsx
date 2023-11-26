import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
)

export const Input = defineMultiStyleConfig({
    // The styles all button have in common
    baseStyle: {},
    sizes: {},
    variants: {
        outline: definePartsStyle({
            field: {
                ///
                _focus: {
                    border: "1px solid",
                    borderColor: "primary",
                    boxShadow: "0 0 0 1px primary",
                },
            },
        }),
    },
    defaultProps: {},
})
