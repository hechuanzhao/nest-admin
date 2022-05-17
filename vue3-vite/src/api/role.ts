import { ApiMethodContants, BaseResult, ResultData } from "@/common/types/apiResult.type"
import { BASE_URL } from "@/main"
import { QueryUserList } from "./user"
import http from '../utils/request'
export interface RoleApiResult extends BaseResult{
    name:string
    remark?:string 
    roleMenuList?:[]
}
export interface QueryRoleList{
    name?:string
}
export function getRoleList(params?:QueryRoleList):Promise<ResultData<RoleApiResult[]>>{
    return http.request<ResultData<RoleApiResult[]>>({
        url:`${BASE_URL}/role/list`,
        method:ApiMethodContants.GET,
        ...{ params }
    })
}

export interface ICreateOrUpdateRole {
    id?: string
    // 角色名称
    name?: string
    // 角色备注
    remark?: string
    // 菜单id
    menuIds?: string[]
}
  

export function getRolePerms (id: string): Promise<ResultData<Array<string>>> {
    return http.request<ResultData<Array<string>>>({
      url: `${BASE_URL}/role/one/${id}/perms`,
      method: ApiMethodContants.GET
    })
  }
  
  export function createRole (data: ICreateOrUpdateRole): Promise<ResultData<RoleApiResult>> {
    return http.request<ResultData<RoleApiResult>>({
      url: `${BASE_URL}/role`,
      method: ApiMethodContants.POST,
      data
    })
  }
  
  export function updateRole (data: ICreateOrUpdateRole): Promise<ResultData<RoleApiResult>> {
    return http.request<ResultData<RoleApiResult>>({
      url: `${BASE_URL}/role`,
      method: ApiMethodContants.PUT,
      data
    })
  }
  
  export function delRoleInfo (id: string): Promise<ResultData<null>> {
    return http.request<ResultData<null>>({
      url: `${BASE_URL}/role/${id}`,
      method: ApiMethodContants.DELETE
    })
  }
  