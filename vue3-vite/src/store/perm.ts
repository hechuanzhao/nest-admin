import { resolve } from "path";
import { defineStore } from "pinia";
import { MenuApiResult } from "../api/menu";
import { AppRouterRecordRaw } from "../common/types/appRoute.type";
import { asyncRoutes, constantsRoutes } from "../router";

export type PermissionsState = {
    routes:AppRouterRecordRaw[],
    addRoutes:AppRouterRecordRaw[],
    isReqPerm:boolean
}

const hasPermission = (route:AppRouterRecordRaw,menus:MenuApiResult[]):boolean=>{
    if(route.name){
        return menus.some(menu=>menu.code === route.name)
    }
    if(route.hidden)
        return true 
    if(route.children&&route.children.length>0)
        return hasPermission(route.children[0],menus)
    return false
}

//递归遍历路由
const filterAsyncRoutes = (routes:AppRouterRecordRaw[],menus:MenuApiResult[]):AppRouterRecordRaw[]=>{
    const res:AppRouterRecordRaw[]=[]
    routes.forEach(route=>{
        const tmp = {...route}
        if(hasPermission(tmp,menus)){
            if(tmp.children && tmp.children.length>0) 
            tmp.children = filterAsyncRoutes(tmp.children,menus)
            res.push(tmp)
        }
    })
    return res
}
export const usePermStore = defineStore('perm',{
    state: ():PermissionsState=>{
        return {
            routes:[],
            addRoutes:[],
            isReqPerm:false
        }
    },
    actions:{
        generaterRoutes(menus:MenuApiResult[]):Promise<AppRouterRecordRaw[]>{
            return new Promise(resolve=>{
                const accessRoutes:AppRouterRecordRaw[] = filterAsyncRoutes(asyncRoutes,menus)
                this.addRoutes = accessRoutes 
                this.routes = constantsRoutes.concat(accessRoutes)
                this.isReqPerm = true
                resolve(accessRoutes)
            })
        },
        
    }
})