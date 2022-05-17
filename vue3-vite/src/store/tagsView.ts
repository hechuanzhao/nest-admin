import { defineStore } from "pinia";
import { AppRouterRecordRaw } from "../common/types/appRoute.type";
export type TagsViewState = {
    visitedViews:AppRouterRecordRaw[],
    cachedViews:string[]
}
export const useTagsViewStore = defineStore('tagsView',{
    state:():TagsViewState=>{
        return{ 
            visitedViews:[],
            cachedViews:[]
        }
    },
    actions:{
        addVisitedView( view: AppRouterRecordRaw){
            if(this.visitedViews.some(v=>v.path === view.path)) return
            this.visitedViews.push(view)
        },
        addCachedView( view: string){
            if (this.cachedViews.includes(view)) return
            this.cachedViews.push(view)
        },
        delVisitedView(view: AppRouterRecordRaw){
            for (const [i, v] of this.visitedViews.entries()) {
                if (v.path === view.path) {
                  this.visitedViews.splice(i, 1)
                  break
                }
            }
        },
        delCachedView( view: string){
            const views = []
            views.push(...view)
            views.forEach(v => {
              const index = this.cachedViews.indexOf(v)
              index > -1 && this.cachedViews.splice(index, 1)
            })
        },
        delOthersVisitedViews( view: AppRouterRecordRaw){
            this.visitedViews = this.visitedViews.filter(v => {
                return v.meta || v.path === view.path
            })
        },
        delOthersCachedViews( view: string){
            const index = this.cachedViews.indexOf(view)
            if (index > -1) {
              this.cachedViews = this.cachedViews.slice(index, index + 1)
            } else {
              // if index = -1, there is no cached tags
              this.cachedViews = []
            }
        },
        delAllVisitedViews(){
            this.visitedViews = []
        },
        delAllCachedViews(){
            this.cachedViews = []
        },
        updateVisitedView( view: AppRouterRecordRaw){
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                  v = Object.assign(v, view)
                  break
                }
            }
        },
    }
})