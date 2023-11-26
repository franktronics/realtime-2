export type ElelementConfigType = {
    name: string
    id: string
    unit: string
    color: string //rgb(x, x, x) or #rrvvbb
}
export const ElelementConfig: Array<ElelementConfigType> = [
    /*{
        name: "Temperature",
        id: "temp",
        unit: "°C",
        color: "#7251b2",
    },*/
]

export const getEltObject = () => {
    const obj = {}
    ElelementConfig.forEach((elt: ElelementConfigType) => {
        Object.assign(obj, { [`${elt.id}`]: 0 })
    })
    return obj
}
