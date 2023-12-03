/*
 * 0 neutre
 * 1 ok
 * -1 nok
 * 2 probleme
 */
export type ImagesConfigType = {
    id: string
    status: 1 | 0 | -1 | 2
    url: string
}
export const ImagesConfig: ImagesConfigType = {
    id: "1",
    status: 0,
    url: "/img/test.jpeg",
}
