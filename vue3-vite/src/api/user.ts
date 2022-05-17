import { ApiMethodContants, BaseResult, ListResultData, Pagination, ResultData } from "../common/types/apiResult.type"
import { BASE_URL } from "../main"
import http from '../utils/request'
import { getRefreshToken } from "../utils/storage"
export interface LoginResult {
    accessToken: string 
    refreshToken: string 
}

export interface UserLogin {
    account: string 
    password: string
}

export interface UserApiResult extends BaseResult{
    avatar?:string
    account?:string
    phoneNum?:string
    email?:string
    status?:0 | 1 | string
}

export interface ICreateOrUpdateUser extends UserApiResult {
    password?: string
    roleIds?: number[]
  }
  
export interface QueryUserList extends Pagination {
    /** 帐号，手机号，名称 */
    account?: string
    /** 用户是否可用 */
    status?: string | 0 | 1
    /** 角色id */
    roleId?: string
    /** 是否绑定当前角色 0-无， 1-绑定 */
    hasCurrRole?: 0 | 1
}

export interface BindUserData {
    userIds: string[]
    roleId: string
    type: 'create' | 'cancel'
}

export function login(loginData: UserLogin): Promise<ResultData<LoginResult>>{
    return http.request<ResultData<LoginResult>>({
        url: `${BASE_URL}/login`,
        method: ApiMethodContants.POST,
        data: loginData
    })
}

export function updateToken(): Promise<ResultData<LoginResult>>{
    return http.request({
        url: `${BASE_URL}/update/token`,
        method: ApiMethodContants.POST,
        headers: { Authorization: 'Bearer ' + getRefreshToken() }
    })
}

export function getUserInfoApi(id?:string): Promise<ResultData<UserApiResult>>{
    return http.request<ResultData<UserApiResult>>({
        url:`${BASE_URL}/user/one/info`,
        method:ApiMethodContants.GET,
        params:{id}
    })
}

export function getUserInfo (id?: string): Promise<ResultData<UserApiResult>> {
    return http.request<ResultData<UserApiResult>>({
      url: `${BASE_URL}/user/one/info`,
      method: ApiMethodContants.GET,
      params: { id }
    })
  }
  
  export function getUserList (params: QueryUserList): Promise<ResultData<ListResultData<UserApiResult>>> {
    return http.request<ResultData<ListResultData<UserApiResult>>>({
      url: `${BASE_URL}/user/list`,
      method: ApiMethodContants.GET,
      params
    })
  }
  
  export function updateUser (data: ICreateOrUpdateUser): Promise<ResultData<null>> {
    return http.request<ResultData<null>>({
      url: `${BASE_URL}/user`,
      method: ApiMethodContants.PUT,
      data
    })
  }
  
  export function resetPassword (userId: string): Promise<ResultData<null>> {
    return http.request<ResultData<null>>({
      url: `${BASE_URL}/user/password/reset/${userId}`,
      method: ApiMethodContants.PUT
    })
  }
  
  export function updateStatus (data: ICreateOrUpdateUser): Promise<ResultData<null>> {
    return http.request<ResultData<null>>({
      url: `${BASE_URL}/user/status/change`,
      method: ApiMethodContants.PUT,
      data
    })
  }
  
  export function getUserRoleIds (id: string): Promise<ResultData<number[]>> {
    return http.request<ResultData<number[]>>({
      url: `${BASE_URL}/user/${id}/role`,
      method: ApiMethodContants.GET
    })
  }
  
  export function bindRoleUser (data: BindUserData): Promise<ResultData<null>> {
    return http.request<ResultData<null>>({
      url: `${BASE_URL}/user/role/update`,
      method: ApiMethodContants.POST,
      data
    })
  }
  
  export function dowmloadUserTemplate () {
    return http.request({
      url: `${BASE_URL.tmplDownloadUrl}/用户导入模板.xlsx`,
      method: ApiMethodContants.GET,
      responseType: 'blob'
    })
  }
  