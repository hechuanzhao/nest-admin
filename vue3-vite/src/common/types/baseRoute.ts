import { RouteMeta } from "vue-router"
import { AppRouterRecordRaw } from "./appRoute.type"

export type Meta = {
    //当前路由的title,做显示用 name 作为路由的唯一标识
    title: string 
    // 图标
    icon?: string
    //当前路由是否固定在tagsView
    affix?: string 
    activeMenu: string
}

export type BaseRoute = {
    hidden?: true 
    children?: Array<AppRouterRecordRaw>
    meta?: RouteMeta | Meta
    //总是显示该路由
    alwaysShow?: boolean
    noShowingChildren?: boolean
}