import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import "@fancyapps/ui/dist/fancybox.css";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/base.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { ElCollapseTransition } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'//代码展示高亮
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";//图片放大
import lazy from '@/utils/lazy'; // 图片懒加载
import transition from '@/utils/transition'
import { createPinia } from 'pinia' //状态管理
import lzyIcon from '@/components/icon.vue'; //图标组件
import FontAwesomeIcon from '@/assets/IconFont/fortawesome';//字体图标
import VueMarkdownEditor from '@/utils/markDownCreate'; //markdown配置


const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$fancyapps = { Fancybox, }
app.directive('transition', transition)
app.directive('lazy', lazy)
app.component('lzyIcon', lzyIcon)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component(ElCollapseTransition.name, ElCollapseTransition)
app.use(ElementPlus)
app.use(hljsVuePlugin)
app.use(router)
app.use(pinia)
app.use(VueMarkdownEditor);

//element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
