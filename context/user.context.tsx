import { auth } from "@/config/firebase"
import { useColorMode } from "@chakra-ui/react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"

export type UserType = {
    id: string
    email: string
    name: string
}
export type UserContextType = {
    setUser: (data: UserType) => void
} & UserType
const contextDefaultValue: UserContextType = {
    id: "",
    email: "",
    name: "",
    setUser: () => {},
}

export const UserContext = createContext<UserContextType>(contextDefaultValue)
export const useUser = () => useContext(UserContext)
export const UserProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const userAuth = useRef<{ data: UserType }>({
        data: { id: "", email: "", name: "" },
    })
    const [isUser, setIsUser] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (userCredential) => {
            if (!userCredential) {
                router.push("/signin")
            } else {
                userAuth.current.data = {
                    email: userCredential.email || "",
                    name: userCredential.displayName || "",
                    id: userCredential.uid,
                }
                setIsUser(true)
            }
        })
    }, [])

    const value = useMemo(
        () => ({
            ...userAuth.current.data,
            setUser: (data: UserType) => {
                userAuth.current.data = data
            },
        }),
        [isUser, userAuth.current.data]
    )
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
