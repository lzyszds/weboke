import { createRouter, createWebHashHistory } from 'vue-router'
import index from '@/views/home/index.vue'
import undefind404 from '@/views/404.vue'
// 引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式
const routes = [
    {
        path: '/',
        redirect: '/home/index' // 注意，没有重定向就会出现两个一模一样的home页面
    },
    {
        path: '/home',
        name: 'home',
        component: index,
        children: [
            {
                path: 'index',
                name: 'Content',
                component: () => import('@/views/home/Home.vue')
            }, {
                path: 'detail/:id',
                name: 'detail',
                component: () => import('@/views/home/Content-Detail.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/About.vue')
    },
    {
        path: '/photo',
        name: 'photo',
        component: () => import('@/views/photo/Photo.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    }, {
        path: '/episit',
        name: 'Episit',
        component: () => import('@/views/episit/index.vue')
    },
    {
        path: "/:catchAll(.*)",
        name: 'undefind404',
        component: undefind404 // 注意，没有重定向就会出现两个一模一样的home页面
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) { // 始终滚动到顶部
        setTimeout(() => {
            document.querySelector('body')!.classList.remove('loading')
        }, 1000)
        return { top: 0 }
    }
})
// 前置钩子
router.beforeEach(async (to: any) => {
    /* 拦截 正则匹配拦截后台管理页面userAdmin的路由 */
    if (to.matched.some((record: any) => record.path.indexOf('userAdmin') != -1)) {
        const token = localStorage.getItem('lzy_token')
        if (!token) {
            return '/login'
        }
    }

    if (to.hash === '') {
        if (to.href.indexOf('userAdmin') != -1)
            return
        document.querySelector('.navbarContent')?.classList.remove('navbarContent100')
        document.querySelector('body')!.classList.add('loading')
    }
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
})
export default router
