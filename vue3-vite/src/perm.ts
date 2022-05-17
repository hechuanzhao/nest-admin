import { AppRouterRecordRaw } from "./common/types/appRoute.type"
import router from "./router"
import { usePermStore } from "./store/perm"
import { useUserStore } from "./store/user"

import { getToken } from "./utils/storage"
const whiteList = ['/login']
router.beforeEach(async (to,from,next)=>{
    const permStore = usePermStore()
    const userStore = useUserStore()
    const toMetaTitle = to.meta?.title || ''
    document.title = `${toMetaTitle ? (toMetaTitle + '-') : ''}NEST`
    const hasToken = getToken()
    if(hasToken){
        if(to.path==='login'){
            next({path:'/'})
        }else if(!permStore.isReqPerm){
            userStore.getUserInfo()
            const menuPerms = await userStore.getCurrUserMenuPerms()
            const accessRoutes:Array<AppRouterRecordRaw> = await permStore.generaterRoutes(menuPerms)
            accessRoutes.forEach(route=>router.addRoute(route))
            next({ ...to,replace:true })
        }else next()
    }else if(whiteList.indexOf(to.path)!==-1) next()
    else{
        next(`/login${['','/'].includes(to.path) ? '' : ('?redirect='+to.path)}`)
    }
})