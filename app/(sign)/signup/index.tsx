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
import { ToastContainer, toast } from "react-toastify"
import BeatLoader from "react-spinners/BeatLoader"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, database } from "@/config/firebase"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ref, set } from "firebase/database"
import { getEltObject } from "@/config/elements"
import { getActionObject } from "@/config/actions"
import * as yup from "yup"

type SignupDataProps = {
    email: string
    name: string
    password: string
    checkPassword: string
}
let signupSchema = yup.object().shape({
    name: yup.string().required("Entrer votre nom"),
    email: yup.string().email("Entrer une adresse valide").required("Email est obligatoire"),
    password: yup.string().min(6, "Au moins 6 caractères"),
    checkPassword: yup.string().oneOf([yup.ref("password")], "Ne correspond pas"),
})

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupDataProps>({
        resolver: yupResolver(signupSchema),
    })
    const [show, toggleShow] = useToggle(false)
    const [state, setState] = useState<"pending" | "finish">("finish")
    const router = useRouter()

    const submit = async (data: SignupDataProps) => {
        setState("pending")
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: data.name })
            else throw new Error("")
            const user = userCredential.user
            await set(ref(database, "users/" + user.uid), {
                name: data.name,
                email: data.email,
                elements: [getEltObject()],
                actions: { ...getActionObject() },
            })
            toast.success("Utilisateur cree")
            setState("finish")
            const timer = setTimeout(() => {
                router.push("/signin")
                clearTimeout(timer)
            }, 1000)
        } catch (error: any) {
            setState("finish")
            const errorCode = error.code
            const errorMessage = error.message
            console.error("Erreur creation utilisateur", errorCode, errorMessage)
            if (errorCode == "auth/email-already-in-use")
                toast.warning("Cet email est deja utilisee")
            else toast.error("Une erreur est survenue")
        }
    }

    return (
        <>
            <ToastContainer toastClassName="toast-custom-body" />
            <LayoutSign title={"Creez votre compte"} logo={logo}>
                <form onSubmit={handleSubmit(submit)}>
                    <Box>
                        <FormControl mb="20px" isInvalid={errors.email ? true : false}>
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
                                <FormHelperText>Fait office d&apos;identifiant</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb="20px" isInvalid={errors.name ? true : false}>
                            <FormLabel>Nom</FormLabel>
                            <Input {...register("name")} type="text" placeholder="Adrien" />
                            {errors.name ? (
                                <FormErrorMessage color="error">
                                    {errors.name.message}
                                </FormErrorMessage>
                            ) : (
                                <FormHelperText>Votre nom d&apos;utilisateur</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb="20px" isInvalid={errors.password ? true : false}>
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
                                <FormHelperText>Au moins 6 caractères</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb="20px" isInvalid={errors.checkPassword ? true : false}>
                            <FormLabel>Vérifier</FormLabel>
                            <Input
                                {...register("checkPassword")}
                                type={show ? "text" : "password"}
                                placeholder="Verifier mot de passe"
                            />
                            {errors.checkPassword ? (
                                <FormErrorMessage color="error">
                                    {errors.checkPassword.message}
                                </FormErrorMessage>
                            ) : (
                                <FormHelperText>Repeter le mot de passe</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            isLoading={state === "pending"}
                            spinner={<BeatLoader color="#fff" size={10} />}
                            type="submit"
                        >
                            S&apos;inscrire
                        </Button>
                    </Box>
                    <Box pt="2">
                        <Link href="/signin">
                            <Text _hover={{ color: "primary" }}>Deja inscrit? Se connecter</Text>
                        </Link>
                    </Box>
                </form>
            </LayoutSign>
        </>
    )
}
