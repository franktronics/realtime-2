import { defineStyleConfig } from "@chakra-ui/react"

export const Button = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {},
    sizes: {},
    variants: {
        solid: {
            bg: "primary",
            color: "#fff",
            _hover: {
                bg: "primary-dark",
            },
        },
        cansel: {
            bg: "walpha.200",
            color: "black.100",
            _hover: {
                bg: "walpha.300",
            },
        },
        warning: {
            bg: "error",
            color: "#fff",
            _hover: {
                bg: "error",
            },
        },
    },
    defaultProps: {},
})
