"use client"

import { ImagesConfigType } from "@/config/images"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import { ref, set } from "firebase/database"
import { database } from "@/config/firebase"
import { useUser } from "@/context/user.context"
import { toast } from "react-toastify"

export type ImageCardProps = {
    data: Array<ImagesConfigType>
}

export const ImageCard = (props: ImageCardProps) => {
    const { data } = props
    const userContext = useUser()

    let indexImage = 0
    const image = data.find((img, k) => {
        indexImage = k
        return img.status === 0
    })

    const handleBtn = (status: ImagesConfigType["status"], index: number) => {
        set(ref(database, "users/" + userContext.id + "/images/" + index + "/status"), status)
            .then(() => {
                toast.success("Modification envoyée")
            })
            .catch(() => {
                toast.error("Erreur lors de l'envoi")
            })
    }

    return (
        <Box>
            {image && (
                <Box
                    w={"600px"}
                    aspectRatio={"4/3"}
                    position={"relative"}
                    borderRadius={10}
                    overflow={"hidden"}
                >
                    <Image fill src={image.url} alt={""} objectFit={"cover"} />
                </Box>
            )}
            {!image && (
                <Box
                    w={"600px"}
                    aspectRatio={"4/3"}
                    position={"relative"}
                    borderRadius={10}
                    overflow={"hidden"}
                    bg={"gray.200"}
                ></Box>
            )}

            <Flex pt={"5"} gap={5}>
                {image && (
                    <>
                        <Button type={"submit"} onClick={() => handleBtn(1, indexImage)}>
                            OK
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"warning"}
                            onClick={() => handleBtn(-1, indexImage)}
                        >
                            NOK
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"alert"}
                            onClick={() => handleBtn(2, indexImage)}
                        >
                            A revoir
                        </Button>
                    </>
                )}
            </Flex>
        </Box>
    )
}
