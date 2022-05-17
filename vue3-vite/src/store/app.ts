import { defineStore } from "pinia"
export interface Sidebar {
    opened: boolean
    withoutAnimation:boolean
}
type Device = 'desktop' | 'mobile'
type Size = '' | 'large' | 'small' | 'mini'
export interface AppState {
    sidebar: Sidebar
    device: Device 
    size: Size,
}


export const useAppStore = defineStore('app',{
    state:():AppState=>{
        return{
            sidebar:{
                opened: sessionStorage.getItem('sidebarStatus') ? 
                !!Number(sessionStorage.getItem('sidebarStatus')) : true,
                withoutAnimation: false,
            },
            device:'desktop',
            size: sessionStorage.getItem('size') as Size || 'small',
        }
    },
    actions:{
        toggleSidebar(){
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = false
            if (this.sidebar.opened) {
              sessionStorage.setItem('sidebarStatus', '1')
            } else {
              sessionStorage.setItem('sidebarStatus', '0')
            }
        },
        closeSidebar(withoutAnimation:any){
            sessionStorage.setItem('sidebarStatus', '0')
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        },
        toggleDevice(device:any){
            this.device = device
        },
        setSize(size:any){
            this.size = size
            sessionStorage.setItem('size', size)
        },
    }
})
