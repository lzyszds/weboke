import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import "@fancyapps/ui/dist/fancybox.css";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/base.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'//代码展示高亮
import { Fancybox } from "@fancyapps/ui";//图片放大
import lazy from '@/utils/lazy'; // 图片懒加载
import transition from '@/utils/transition'
import { createPinia } from 'pinia' //状态管理
import LzyIcon from '@/components/LzyIcon.vue'; //图标组件
import VueMarkdownEditor from '@/utils/markDownCreate'; //markdown配置
import axios from "@/http/request";
import { copyTip, getIpWeather } from '@/utils/common'

import FontFunction from '@/utils/font'
window.$axios = axios

const pinia = createPinia()
const app = createApp(App)

// vue3全局变量挂载
app.config.globalProperties.$fancyapps = { Fancybox }

app.directive('transition', transition)
app.directive('lazy', lazy)
app.component('LzyIcon', LzyIcon)
app.use(hljsVuePlugin)
app.use(router)
app.use(pinia)
app.use(VueMarkdownEditor);

// 获取当前天气
await getIpWeather()
//复制提示
copyTip()
FontFunction(document)
app.mount('#app')
