import {
  createApp
} from 'vue'
import('@/assets/font/font.css')
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import "./assets/css/tailwind.css"
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// import common from '@/untils/common.js'; //全局按钮防抖事件
import store from './store'
import naive from 'naive-ui'
// Vue.config.globalProperties.$noMulClicks = common.noMulClicks
const app = createApp(App)

app.use(store)
app.use(naive)
app.use(ArcoVue)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
