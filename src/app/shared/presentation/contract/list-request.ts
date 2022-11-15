export interface IListRequest {
    skip: number
    take: number
    filter: string
    orderBy?: string
    orderByDescending: boolean
}