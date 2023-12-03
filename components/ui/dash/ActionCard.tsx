import { auth, database } from "@/config/firebase"
import { useUser } from "@/context/user.context"
import { Box, Flex, FormControl, FormLabel, Switch, Text } from "@chakra-ui/react"
import { onAuthStateChanged } from "firebase/auth"
import { onValue, ref, set } from "firebase/database"
import { ChangeEvent, useEffect, useId, useState } from "react"
import { ActionsConfigType } from "@/config/actions"

export type ActionCardProps = {
    data: ActionsConfigType
}
export const ActionCard = (props: ActionCardProps) => {
    const { name, id, marker } = props.data

    const idInput = useId()
    const [state, setState] = useState(false)
    const userContext = useUser()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const chk = e.target.checked
        set(ref(database, "users/" + userContext.id + "/actions/" + id), chk ? 1 : 0).then(() => {
            setState(chk)
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                const starRef = ref(database, "users/" + userCredential.uid + "/actions/" + id)
                onValue(starRef, (snapshot) => {
                    const data = snapshot.val()
                    if (data === 1) setState(true)
                    else if (data === 0) {
                        setState(false)
                    }
                })
            }
        })
    }, [])

    return (
        <Box display={"inline-block"}>
            <FormControl>
                <FormLabel htmlFor={idInput} m={0} mr={5}>
                    {name}
                </FormLabel>
                <Box gap={2} pt={2} display={"grid"} gridTemplateColumns={"auto auto auto"}>
                    <Text
                        w={"80px"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                    >
                        {marker.off}
                    </Text>
                    <Switch id={idInput} size="lg" isChecked={state} onChange={handleChange} />
                    <Text>{marker.on}</Text>
                </Box>
            </FormControl>
        </Box>
    )
}
