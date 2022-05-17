<template>
    <div class="sidebar-container">
        <Logo :collapse = "isCollapse"></Logo>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
             :default-active="activeMenu"
             :collapse="isCollapse"
             :background-color="variables.menuBg"
             :text-color="variables.menuText"
             :unique-opened="false"
             :active-text-color="variables.menuActiveText"
             :collapse-transition="false"
             mode="vertical"
             class="nest-menu"
             >
                <sidebar-item 
                 v-for="route in permRoutes" 
                 :key="route.path" 
                 :item="route" 
                 :base-path="route.path"
                >
                </sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { usePermStore } from "../../../store/perm";
import { useAppStore } from "../../../store/app";
import  SidebarItem  from './SidebarItem.vue'
import Logo from './Logo.vue'
export default defineComponent({
    name:'Sidebar',
    components:{Logo,SidebarItem},
    setup(props) {
        const permStore = usePermStore()
        const appStore = useAppStore()
        const permRoutes = computed(()=>permStore.routes)
        const  activeMenu = computed(()=>{
            const route = useRoute()
            const {meta,path} = route
            if(meta.activeMenu) return meta.activeMenu
            return path
        })
        const isCollapse = computed(()=>!appStore.sidebar.opened)
        return{
            permRoutes,
            isCollapse,
            activeMenu,
            variables: {
                menuBg: '#304156',
                menuText: '#bfcbd9',
                menuActiveText: '#409EFF'
            }
        }
    }
})
</script>