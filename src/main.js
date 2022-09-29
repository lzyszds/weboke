import { createApp } from 'vue'
import('@/assets/font/font.css')
import('@/assets/css/index.css')
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import "./assets/css/tailwind.css"
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/iconFont/iconfont.css'
import '@/assets/iconFont/iconfont.js'
import common from '@/untils/common.js'; //全局按钮防抖事件
const app = createApp(App)
app.config.globalProperties.$common = common
import {
    createPinia
} from 'pinia'
const pinia = createPinia()

app.use(ArcoVue)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
