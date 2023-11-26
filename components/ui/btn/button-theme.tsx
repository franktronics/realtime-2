import { IconButton } from "@chakra-ui/react"
import { LightIcon, DarkIcon } from "@/components/shared/svg-pack"

/* eslint-disable-next-line */
export interface ButtonThemeProps {
    theme: "light" | "dark"
    toggle: Function
}

export function ButtonTheme(props: ButtonThemeProps) {
    const { theme = "light", toggle } = props

    return (
        <IconButton
            onClick={() => toggle()}
            variant={"outline"}
            colorScheme="black.100"
            aria-label="Theme"
            icon={
                theme === "dark" ? (
                    <LightIcon color="var(--chakra-colors-black-100)" />
                ) : (
                    <DarkIcon color="var(--chakra-colors-black-100)" />
                )
            }
            size="sm"
            border="none"
        />
    )
}

export default ButtonTheme
