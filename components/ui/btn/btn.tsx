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
            _disabled: {
                bg: "primary",
                color: "#fff",
                opacity: 0.5,
            },
        },
        cansel: {
            bg: "walpha.200",
            color: "black.100",
            _hover: {
                bg: "walpha.300",
            },
            _disabled: {
                bg: "walpha.200",
                color: "black.100",
                opacity: 0.5,
            },
        },
        warning: {
            bg: "error",
            color: "#fff",
            _hover: {
                bg: "error",
            },
            _disabled: {
                bg: "error",
                color: "#fff",
                opacity: 0.5,
            },
        },
    },
    defaultProps: {},
})
