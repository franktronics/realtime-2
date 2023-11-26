export const parseColor = (color: string): string => {
    if (color.includes("#") && color.length > 1) {
        return color + "80"
    } else if (color.includes("rgb")) {
        let tab = color.split(")")
        tab[0] = tab[0] + ", 0.5"
        return tab.join(")")
    } else {
        return "rgba(53, 162, 235, 0.5)"
    }
}
