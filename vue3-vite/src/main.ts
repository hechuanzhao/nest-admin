import { createApp } from 'vue'
import App from './App.vue'
export const BASE_URL:any = import.meta.env.VITE_APP_BASE_API_URL
export const TIMEOUT: any = import.meta.env.VITE_APP_API_REQUEST_TIMEOUT
import store from './store/index'
import SvgIcon from './components/SvgIcon/index.vue'
import KTable from './plugins/table/index.vue'
import KBadge from './plugins/badge/index.vue'
import KForm from './plugins/form/index.vue'
import KSelectTree from './plugins/select_tree/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import permDirective from './directives/perm'
import 'virtual:svg-icons-register'
import { useUserStore } from './store/user'
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'

import router from './router'

import './perm'

import './styles/index.scss'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.component('KTable',KTable)
app.component('KForm',KForm)
app.component('KBadge',KBadge)
app.component('KSelectTree',KSelectTree)
app.directive('perm',permDirective)
app.use(router)
   .use(store)
   .use(ElementPlus)
   .use(VueCropper)
   .mount('#app')

export const userStore = useUserStore()

