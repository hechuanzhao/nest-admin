import { ApiMethodContants, ResultData } from "../common/types/apiResult.type"
import { MenuApiResult } from "./menu"
import http from '../utils/request'
import { BASE_URL } from "../main"
export interface PermApiResult{
    //后端api url
    path:string
    method:string 
    desc:string
}

export function getCurrUserMenuPerms():Promise<ResultData<MenuApiResult[]>>{
    return http.request<ResultData<MenuApiResult[]>>({
        url: `${BASE_URL}/perm/menu`,
        method: ApiMethodContants.GET
    })
}
export function getAllApiPerms (): Promise<ResultData<Array<PermApiResult>>> {
    return http.request<ResultData<Array<PermApiResult>>>({
      url: `${BASE_URL}/perm/all`,
      method: ApiMethodContants.GET
    })
}