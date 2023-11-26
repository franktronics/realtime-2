import { useCallback, useState } from "react"

export const useToggle = (init: boolean): [boolean, (val?: boolean) => void] => {
    const [state, setState] = useState(init)
    const toggle = useCallback(
        (val?: boolean) => {
            if (val) {
                setState(val)
            } else {
                setState((s) => !s)
            }
        },
        [setState]
    )

    return [state, toggle]
}
