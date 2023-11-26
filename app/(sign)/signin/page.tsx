"use client"

import { LayoutSign } from "@/components/shared/LayoutSign"
import { useToggle } from "@/hooks/useToggle"
import logo from "@/public/img/logo.svg"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BeatLoader from "react-spinners/BeatLoader"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import * as yup from "yup"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/config/firebase"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user.context"
import Link from "next/link"

type SigninDataProps = {
    email: string
    password: string
}
let signupSchema = yup.object().shape({
    email: yup.string().email("Entrer une adresse valide").required("Email est obligatoire"),
    password: yup.string().min(6, "Au moins 6 caractères").required("Mot de passe obligatoire"),
})

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninDataProps>({
        resolver: yupResolver(signupSchema),
    })
    const [show, toggleShow] = useToggle(false)
    const [state, setState] = useState<"pending" | "finish">("finish")
    const router = useRouter()
    const userContext = useUser()

    const submit = async (data: SigninDataProps) => {
        setState("pending")
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                toast.success("Connexion reussie")
                setState("finish")
                userContext.setUser({
                    email: user.email || "",
                    name: user.displayName || "",
                    id: user.uid,
                })

                const timer = setTimeout(() => {
                    router.push("/")
                    clearTimeout(timer)
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error("Erreur connexion utilisateur", errorCode, errorMessage)
                if (errorCode == "auth/user-not-found")
                    toast.warning("Cet utilisateur n'existe pas")
                if (errorCode == "auth/wrong-password") toast.warning("Mot de passe incorrect")
                else toast.error("Une erreur est survenue")
                setState("finish")
            })
    }

    return (
        <>
            <ToastContainer toastClassName="toast-custom-body" />
            <LayoutSign title={"Connectez vous"} logo={logo}>
                <form onSubmit={handleSubmit(submit)}>
                    <Box>
                        <FormControl mb="20px" isInvalid={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="exemple@gmail.com"
                            />
                            {errors.email ? (
                                <FormErrorMessage color="error">
                                    {errors.email.message}
                                </FormErrorMessage>
                            ) : (
                                <FormHelperText>Email de votre compte</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb="20px" isInvalid={!!errors.password}>
                            <FormLabel>Mot de passe</FormLabel>
                            <InputGroup>
                                <Input
                                    {...register("password")}
                                    type={show ? "text" : "password"}
                                    placeholder="Enter mot de passe"
                                />
                                <InputRightElement width="3.5rem">
                                    <Button h="1.75rem" size="xs" onClick={() => toggleShow()}>
                                        {show ? (
                                            <AiOutlineEyeInvisible size="20px" />
                                        ) : (
                                            <AiOutlineEye size="20px" />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password ? (
                                <FormErrorMessage color="error">
                                    {errors.password.message}
                                </FormErrorMessage>
                            ) : (
                                <FormHelperText>Mot de passe de securite</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            isLoading={state === "pending"}
                            spinner={<BeatLoader color="#fff" size={10} />}
                            type="submit"
                        >
                            Se connecter
                        </Button>
                    </Box>
                    <Box pt="2">
                        <Link href="/signup">
                            <Text _hover={{ color: "primary" }}>Creer votre compte</Text>
                        </Link>
                    </Box>
                </form>
            </LayoutSign>
        </>
    )
}
