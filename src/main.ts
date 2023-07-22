import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import "@fancyapps/ui/dist/fancybox.css";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/base.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'//代码展示高亮
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";//图片放大
import lazy from '@/utils/lazy'; // 图片懒加载
import transition from '@/utils/transition'
import { createPinia } from 'pinia' //状态管理
import LzyIcon from '@/components/LzyIcon.vue'; //图标组件
import VueMarkdownEditor from '@/utils/markDownCreate'; //markdown配置

localStorage.setItem('qwer', 'qwer')

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$fancyapps = { Fancybox, }
app.directive('transition', transition)
app.directive('lazy', lazy)
app.component('LzyIcon', LzyIcon)
app.use(hljsVuePlugin)
app.use(router)
app.use(pinia)
app.use(VueMarkdownEditor);

// 动态字体生成style
const style = document.createElement('style')
style.innerHTML = `
  @font-face {
    font-family: 'dindin';
    src: url('${import.meta.env.VITE_BASE_URL}/public/font/dist/DingTalk_JinBuTi_Regular.woff');
  }
  @font-face {
    font-family: 'black-Magic';
    src: url('${import.meta.env.VITE_BASE_URL}/public/font/dist/Black-Magic.ttf');
  }
  @font-face {
    font-family: 'firaCode';
    src: url('${import.meta.env.VITE_BASE_URL}/public/font/dist/FiraCode.ttf');
  }
  `
// @font-face {
//   font - family: 'almama';
//   src: url('${import.meta.env.VITE_BASE_URL}/public/font/dist/AlimamaShuHeiTi-Bold.woff');
// }
document.head.appendChild(style)

app.mount('#app')
