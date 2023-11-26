import {
    Box,
    Text,
    Flex,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    IconButton,
    MenuItem,
    Button,
} from "@chakra-ui/react"
import { PropsWithChildren, memo, useState } from "react"
import { motion } from "framer-motion"
import ButtonTheme from "@/components/ui/btn/button-theme"
import { useDashboard } from "@/context/dashboard.context"
import { AiOutlineUser } from "react-icons/ai"
import { useUser } from "@/context/user.context"
import { BeatLoader } from "react-spinners"
import { signOut } from "firebase/auth"
import { auth } from "@/config/firebase"

/* eslint-disable-next-line */
export interface LayoutSignProps {}

// eslint-disable-next-line react/display-name
const LayoutDash = memo((props: PropsWithChildren<LayoutSignProps>) => {
    const { children } = props
    const dashboardContext = useDashboard()
    const userContext = useUser()
    const [btnState, setBtnState] = useState<"pending" | "finish">("finish")

    const handleDisconnect = () => {
        setBtnState("pending")
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setBtnState("finish")
            })
    }

    return (
        <Box bg="light" minH="100vh" pb="20px">
            <Flex
                flexDirection={"column"}
                align={"center"}
                justify={"center"}
                maxW="1440px"
                margin="0 auto"
            >
                <Flex
                    alignSelf="start"
                    padding="10px"
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text textAlign="left" fontSize="lg" color="black.100" fontWeight="bold">
                        Realtime Viewer &#8226; <Badge colorScheme="purple">Beta</Badge>
                    </Text>
                    <Box>
                        <ButtonTheme
                            theme={dashboardContext.theme}
                            toggle={dashboardContext.toggleTheme}
                        />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<AiOutlineUser size="25px" />}
                                variant="outline"
                            />
                            <MenuList p="4">
                                <Flex justifyContent={"center"} pb="4">
                                    <AiOutlineUser size="90px" color="black.40" />
                                </Flex>
                                <MenuItem>
                                    <Text fontWeight={"bold"} pr="1">
                                        Email:{" "}
                                    </Text>
                                    {userContext.email || ""}
                                </MenuItem>
                                <MenuItem>
                                    <Text fontWeight={"bold"} pr="1">
                                        Id:{" "}
                                    </Text>
                                    {userContext.id || ""}
                                </MenuItem>
                                <Box mt="4" pl="2">
                                    <Button
                                        isLoading={btnState === "pending"}
                                        spinner={<BeatLoader color="#fff" size={10} />}
                                        type="submit"
                                        colorScheme="red"
                                        variant={"warning"}
                                        onClick={handleDisconnect}
                                    >
                                        Deconnexion
                                    </Button>
                                </Box>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
                <Box
                    flex="1"
                    maxW={1000}
                    width={"calc(100% - 20px)"}
                    p="20px"
                    m="10px"
                    bg="white"
                    borderRadius={"md"}
                    boxShadow="base"
                >
                    <motion.div
                        initial={{ translateY: 30, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        {children}
                    </motion.div>
                </Box>
            </Flex>
        </Box>
    )
})
LayoutDash.displayName = "LayoutDash"

export { LayoutDash }
