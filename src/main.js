import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import "@fancyapps/ui/dist/fancybox.css";
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";//图片放大
import common from '@/untils/common.js'; //全局按钮防抖事件
import lazy from '@/untils/lazy';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$common = common
/* 
  避免当前使用的ip为国外ip 导致的获取不到ip 
  sougou的查询ip方法不支持国外ip
*/
try {
  app.config.globalProperties.$getip = returnCitySN || ''
} catch (e) {
  console.warn(e)
}

app.config.globalProperties.$fancyapps = { Fancybox, Carousel, Panzoom }
app.directive('lazy', lazy)
app.use(ElementPlus)
app.use(hljsVuePlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
