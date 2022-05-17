export interface ListResultData<T> {
    list: Array<T>
    total: number
}

export interface ResultData<T> {
    code: number
    msg: string 
    data: T | ListResultData<T>
}

export interface BaseResult {
    id: string 
    createDate?: string | number
    updateDate?: string | number
}

export interface Pagination {
    page: number
    size: number 
}

export enum ApiMethodContants {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}