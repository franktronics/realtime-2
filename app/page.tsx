"use client"

import { LayoutDash } from "@/components/shared/LayoutDash"
import { onValue, ref } from "firebase/database"
import { auth, database } from "@/config/firebase"
import { useEffect, useState } from "react"
import { UserType, useUser } from "@/context/user.context"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Box, Flex, Text } from "@chakra-ui/react"
import { ActionsConfig } from "@/config/actions"
import { ActionCard } from "@/components/ui/dash/ActionCard"
import { ImagesConfigType } from "@/config/images"
import { ImageCard } from "@/components/ui/dash/ImageCard"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ElementConfig } from "@/config/elements"
import { ElementCard } from "@/components/ui/dash/ElementCard"
import { extractElement } from "@/utils/array-formater"

export default function Home() {
    const [valueImgs, setValueImgs] = useState<Array<ImagesConfigType>>([])
    const [valueElement, setValueElement] = useState<Array<any>>([])
    const router = useRouter()
    const userContext = useUser()

    useEffect(() => {
        const userData: UserType = { id: "", email: "", name: "" }
        onAuthStateChanged(auth, (userCredential) => {
            if (!userCredential) {
                router.push("/signin")
            } else {
                Object.assign(userData, {
                    email: userCredential.email || "",
                    name: userCredential.displayName || "",
                    id: userCredential.uid,
                })
                userContext.setUser({ ...userData })

                const starRefImages = ref(database, "users/" + userCredential.uid + "/images")
                onValue(starRefImages, (snapshot) => {
                    const data = snapshot.val()
                    if (data) {
                        setValueImgs(Array.from(data))
                    }
                })

                const starRefElts = ref(database, "users/" + userCredential.uid + "/elements")
                onValue(starRefElts, (snapshot) => {
                    const data = snapshot.val()
                    if (data) {
                        setValueElement(Array.from(data))
                    }
                })
            }
        })
    }, [])

    return (
        <>
            <LayoutDash>
                <ToastContainer toastClassName="toast-custom-body" />
                <Flex wrap={"wrap"} gap={10}>
                    <Box>
                        <Text fontSize={"3xl"}>Image</Text>
                        <Box>{valueImgs.length >= 1 && <ImageCard data={valueImgs} />}</Box>
                    </Box>
                    <Box w={"min-content"}>
                        <Text fontSize={"3xl"}>Boutons</Text>
                        <Flex gap={10} flexWrap={"wrap"} pt={2} pb={2}>
                            {ActionsConfig.map((action) => {
                                return (
                                    <ActionCard key={action.id} id={action.id} name={action.name} />
                                )
                            })}
                        </Flex>
                    </Box>
                </Flex>
                <Box pt={10}>
                    <Text fontSize={"3xl"}>Affichage</Text>
                    <Box>
                        {valueElement.length >= 1 &&
                            ElementConfig.map((elt, index) => {
                                return (
                                    <ElementCard
                                        key={elt.id}
                                        data={elt}
                                        value={extractElement(elt.id, valueElement)}
                                    />
                                )
                            })}
                    </Box>
                </Box>
            </LayoutDash>
        </>
    )
}
