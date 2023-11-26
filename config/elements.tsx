export type ElelementConfigType = {
    name: string
    id: string
    unit: string
    color: string //rgb(x, x, x) or #rrvvbb
}
export const ElelementConfig: Array<ElelementConfigType> = [
    {
        name: "Temperature",
        id: "temp",
        unit: "°C",
        color: "#7251b2",
    },
    {
        name: "Frequence cardiaque",
        id: "freq",
        unit: "bpm",
        color: "rgb(53, 162, 235)",
    },
    {
        name: "taux Oxygene",
        id: "toxy",
        unit: "%",
        color: "#fdd663",
    },
]

export const getEltObject = () => {
    const obj = {}
    ElelementConfig.forEach((elt: ElelementConfigType) => {
        Object.assign(obj, { [`${elt.id}`]: 0 })
    })
    return obj
}
