import { BaseResult } from "../common/types/apiResult.type";
import { BaseRoute } from "../common/types/baseRoute";

export enum MenuTypeContants {
    MENU = 1,
    TAB = 2,
    BUTTON = 3
}

export interface MenuApiResult extends BaseResult{
    parentId: string 
    name: string 
    code: string 
    type: string | 1 | 2 | 3
    orderNum?:string|number
    children?:Array<MenuApiResult>
}

export interface MenuPermApiResult extends BaseResult {
    menuId?: string
    apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE'
    apiUrl: string
  }
  
export interface ICreateOrUpdateMenu {
    id?: string | number
    parentId?: string | number
    name?: string
    code?: string
    type?: string | 1 | 2 | 3
    orderNum?: string | number
    menuPermList?: Array<MenuPermApiResult>
    children?: ICreateOrUpdateMenu[]
}