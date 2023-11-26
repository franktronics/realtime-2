export const extractElement = (
    id: string,
    tab: Array<{ [key: string]: number }>
): Array<number> => {
    return tab.map((elt) => {
        return elt[`${id}`]
    })
}
