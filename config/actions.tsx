export type ActionsConfigType = {
    name: string
    id: string
    marker: {
        on: string
        off?: string
    }
}
export const ActionsConfig: Array<ActionsConfigType> = [
    {
        name: "Porte1",
        id: "pte1",
        marker: {
            on: "Ouverte",
            off: "Fermée",
        },
    },
    {
        name: "Porte2",
        id: "pte2",
        marker: {
            on: "Ouverte",
            off: "Fermée",
        },
    },
    {
        name: "Porte3",
        id: "pte3",
        marker: {
            on: "Ouverte",
            off: "Fermée",
        },
    },
]

export const getActionObject = () => {
    const obj = {}
    ActionsConfig.forEach((elt: ActionsConfigType) => {
        Object.assign(obj, { [`${elt.id}`]: 0 }) //0 or 1
    })
    return obj
}
