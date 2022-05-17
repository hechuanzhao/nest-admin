<template>
  <div class="app-wrappers" :class="classObj" >
    <Sidebar />
    <div class="main-container">
      <div>
        <Navbar></Navbar>
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from "../store/app";
export default defineComponent({
    name:'Layout',
    components:{Sidebar,Navbar,AppMain},
    setup(){
      const appStore = useAppStore()
      const classObj = computed(()=>{
        return {
          hideSidebar:!appStore.sidebar.opened,
          openSidebar:appStore.sidebar.opened,
          withoutAnimation:appStore.sidebar.withoutAnimation,
          mobile:appStore.device === 'mobile'
        }
      })
      return{
        classObj
      } 
    }
})
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";
.app-wrappers {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
