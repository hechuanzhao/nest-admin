<template>  
  <router-view :key="key" v-slot="{Component}">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" class="app-container" :key="key"></component>
        </keep-alive>
      </transition>
    </section>
  </router-view>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue"
import { useRoute } from "vue-router"
import { useTagsViewStore } from "../../store/tagsView"

export default defineComponent({
  name: 'AppMain',
  setup () {
    const tagsViewStore = useTagsViewStore()
    const cachedViews = computed(() => tagsViewStore.cachedViews)
    const key = computed(() => useRoute().path)
    return{
      key,
      cachedViews
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  position: relative;
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 10px;
  overflow: hidden;
}

.app-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 70px);
  padding: 16px 20px;
  background: #fff;
  overflow-y: auto;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
