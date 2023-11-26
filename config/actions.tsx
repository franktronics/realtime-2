export type ActionsConfigType = {
    name: string
    id: string
}
export const ActionsConfig: Array<ActionsConfigType> = [
    {
        name: "Porte1",
        id: "pte1",
    },
    {
        name: "Porte2",
        id: "pte2",
    },
    {
        name: "Porte3",
        id: "pte3",
    },
]

export const getActionObject = () => {
    const obj = {}
    ActionsConfig.forEach((elt: ActionsConfigType) => {
        Object.assign(obj, { [`${elt.id}`]: 0 }) //0 or 1
    })
    return obj
}
