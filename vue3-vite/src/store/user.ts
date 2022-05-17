import { defineStore } from 'pinia'
import { MenuApiResult } from '../api/menu'
import { getAllApiPerms, getCurrUserMenuPerms, PermApiResult } from '../api/perm'
import { getUserInfoApi, UserApiResult } from '../api/user'
import { MenuTypeContants } from '../api/menu'
export interface UserState {
    user: UserApiResult,
    permMenus: MenuApiResult[],
    permButton: MenuApiResult[],
    permTabs:MenuApiResult[],
    allApiPerms: PermApiResult[]
}
export const useUserStore = defineStore('user', {
    state: ():UserState => {
        return {
            user:{id:'',account:'',avatar:''},
            permMenus:[],
            allApiPerms:[],
            permButton:[],
            permTabs:[],
        }
    },
    actions: {
        async getUserInfo(reload?:boolean):Promise<UserApiResult>{
            if(this.user && !reload) return this.user
            const res = await getUserInfoApi()
            if(res?.code === 200){
               const user = res.data as UserApiResult
               this.user = user
            }
            return {id:'',account:'',avatar:''} as UserApiResult
        },
        async getCurrUserMenuPerms():Promise<MenuApiResult[]>{
            const res = await getCurrUserMenuPerms()
            if(res?.code===200){
                const data:MenuApiResult[] = res.data as MenuApiResult[]
                const permSource = data
                permSource.forEach(v => {
                    switch (v.type) {
                      case MenuTypeContants.MENU:
                        this.permMenus.push(v)
                        break
                      case MenuTypeContants.TAB:
                        this.permTabs.push(v)
                        break
                      case MenuTypeContants.BUTTON:
                        this.permButton.push(v)
                        break
                      default:
                        break
                    }
                  })
                return data
            }
            return []
        },
        async getAllApiPerms(): Promise<Array<PermApiResult>>{
            if (this.allApiPerms.length > 0) return this.allApiPerms
            const res = await getAllApiPerms()
            if (res?.code === 200) {
              const apiPerms = res.data as Array<PermApiResult>
              this.allApiPerms = apiPerms
              return apiPerms
            }
            return []
        }
    },
})