import { extendTheme } from "@chakra-ui/react"
import { Button } from "@/components/ui/btn/btn"
import { Input } from "@/components/ui/input/input"

export const theme = extendTheme({
    fonts: {
        body: "Inter, sans-serif",
        heading: "Georgia, serif",
        mono: "Menlo, monospace",
    },
    semanticTokens: {
        colors: {
            primary: {
                default: "#7a8cf8",
                _dark: "#7a8cf8",
            },
            "primary-dark": {
                default: "#6277f4",
                _dark: "#6277f4",
            },
            white: {
                default: "#ffffff",
                _dark: "#262a33",
            },
            light: {
                default: "#e4ecf5",
                _dark: "rgba(255, 255, 255, 0.05)",
            },
            blue: {
                default: "#E3F5FF",
                _dark: "#E3F5FF",
            },
            "blue.100": {
                default: "#ffffff",
                _dark: "#1a202c",
            },
            purple: {
                default: "#E5ECF6",
                _dark: "#E5ECF6",
            },
            black: {
                default: "rgba(0, 0, 0, 0.05)",
                _dark: "rgba(255, 255, 255, 0.1)",
            },
            "black.100": {
                default: "#1c1c1c",
                _dark: "#ffffff",
            },
            "black.40": {
                default: "rgba(0, 0, 0, 0.4)",
                _dark: "rgba(255, 255, 255, 0.4)",
            },
            "black.5": {
                default: "rgba(0, 0, 0, 0.05)",
                _dark: "rgba(255, 255, 255, 0.1)",
            },
            success: {
                default: "#10B981",
                _dark: "#10B981",
            },
            error: {
                default: "#F87171",
                _dark: "#F87171",
            },
            info: {
                default: "#0EA5E9",
                _dark: "#0EA5E9",
            },
            warning: {
                default: "#FB923C",
                _dark: "#FB923C",
            },
            "walpha.200": {
                default: "gray.100",
                _dark: "whiteAlpha.200",
            },
            "walpha.300": {
                default: "gray.200",
                _dark: "whiteAlpha.300",
            },
        },
    },
    components: {
        Button,
        Input,
    },
})
