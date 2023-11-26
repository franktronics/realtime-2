"use client"

import { DashboardProvider } from "@/context/dashboard.context"
import { UserProvider } from "@/context/user.context"
import { theme } from "@/theme/chakra.theme"
import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import { PropsWithChildren } from "react"

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <UserProvider>
                    <DashboardProvider>{children}</DashboardProvider>
                </UserProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}
