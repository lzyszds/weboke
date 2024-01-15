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
        component: () => import('@/views/about/About.vue'),
        meta: {
            keepAlive: false  // keepAlive false 不缓存点击重新加载数据
        }
    },
    {
        path: '/photo',
        name: 'photo',
        component: () => import('@/views/photo/Photo.vue')
    },
    // {
    //     path: '/episit',
    //     name: 'Episit',
    //     component: () => import('@/views/episit/index.vue')
    // },
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
        // 创建一个计数器，用于记录静态资源加载的数量
        var resourceCount = 0;

        // 获取页面中所有静态资源元素（比如图片、脚本、样式表等）
        var resources = document.querySelectorAll('img, script, link[rel="stylesheet"]');

        // 遍历每个资源元素，为其绑定load事件
        resources.forEach(function (resource) {
            resource.addEventListener('load', function () {
                resourceCount++;
                console.log(`lzy  resourceCount:`, resourceCount)
                // 当所有资源加载完成时，执行你需要的操作
                if (resourceCount === resources.length) {
                    console.log('所有静态资源加载完成');
                    // 在这里可以执行你需要的操作，比如显示页面内容，或者其他逻辑
                }
            });
        });

        
        setTimeout(() => {
            document.querySelector('body')!.classList.remove('loading')
        }, 500)
        return { top: 0 }
    }
})
// 前置钩子
router.beforeEach(async (to: any, form, next) => {
    if (to.hash === '') {
        document.querySelector('.navbarContent')?.classList.remove('navbarContent100')
        document.querySelector('body')!.classList.add('loading')
    }
    //使用promise延迟进入next()
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(next())
        }, 500)
    })
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
