import { auth, database } from "@/config/firebase"
import { useUser } from "@/context/user.context"
import { Flex, FormLabel, Switch } from "@chakra-ui/react"
import { onAuthStateChanged } from "firebase/auth"
import { onValue, ref, set } from "firebase/database"
import { ChangeEvent, useEffect, useId, useState } from "react"

export type ActionCardProps = {
    name: string
    id: string
}
export const ActionCard = (props: ActionCardProps) => {
    const { name, id } = props
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
        <Flex alignItems={"center"} display={"inline-block"}>
            <FormLabel htmlFor={idInput}>{name}</FormLabel>
            <Switch id={idInput} size="lg" isChecked={state} onChange={handleChange} />
        </Flex>
    )
}
