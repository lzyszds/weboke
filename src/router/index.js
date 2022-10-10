import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/home/index.vue'
import Home from '@/views/home/Home.vue'
import undefind404 from '@/views/404.vue'
//引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式
const routes = [{
    path: '/',
    redirect: '/home/index' //注意，没有重定向就会出现两个一模一样的home页面
},
{
    path: "/:catchAll(.*)",
    name: 'undefind404',
    component: undefind404 //注意，没有重定向就会出现两个一模一样的home页面
},
{
    path: '/home',
    name: 'home',
    component: index,
    children: [{
        path: '/home/index',
        name: 'homeIndex',
        component: Home,
    },
    {
        path: '/home/episit',
        name: 'homeEpisit',
        component: () => import('@/views/episit/index.vue')
    },
    {
        path: '/home/content',
        name: 'Content',
        component: () => import('@/views/home/Content.vue'),
    },
    {
        path: '/home/detail/:id',
        name: 'detail',
        component: () => import('@/views/home/Content-Detail.vue')
    },


    ]
},
{
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/about.vue')
},
{
    path: '/photo',
    name: 'photo',
    component: () =>
        import('@/views/photo/Photo.vue')
},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
router.beforeEach(async to => {
    document.querySelector('body').classList.add('loading')
})
// 简单配置
NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: false })

// 进度条开始
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

// 进度条结束
router.afterEach(() => {
    NProgress.done()
    setTimeout(() => {
        document.querySelector('body').classList.remove('loading')
    }, 500)
})
export default router
