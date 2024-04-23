export type DataResponseObject = {
    men: Array<BaseForm>,
    women: Array<BaseForm>,
}

export type BaseForm = {
    id: number,
    value: number,
}

export type Question = {
    id: string,
    value: string,
}