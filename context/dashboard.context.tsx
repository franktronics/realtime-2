import { useColorMode } from "@chakra-ui/react"
import { createContext, PropsWithChildren, useContext, useMemo } from "react"

export type ThemeType = "light" | "dark"
export type DashboardContextType = {
    theme: ThemeType
    toggleTheme: (t?: ThemeType | undefined) => void
}
const contextDefaultValue: DashboardContextType = {
    theme: "light",
    toggleTheme: () => {},
}

export const DashboardContext = createContext<DashboardContextType>(contextDefaultValue)
export const useDashboard = () => useContext(DashboardContext)
export const DashboardProvider = ({ children }: PropsWithChildren) => {
    const { toggleColorMode, colorMode } = useColorMode()

    const value = useMemo(
        () => ({
            theme: colorMode,
            toggleTheme: (t?: ThemeType | undefined) => {
                if (t === "dark" || t === "light") {
                    if (colorMode !== t) toggleColorMode()
                } else {
                    toggleColorMode()
                }
            },
        }),
        [colorMode]
    )
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
