import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/home/index.vue'
import Home from '@/views/home/Home.vue'

const routes = [{
        path: '/',
        redirect: '/home/index' //注意，没有重定向就会出现两个一模一样的home页面
    },
    {
        path: '/home',
        component: index,
        children: [{
                path: '/home/index',
                component: Home,
            },
            {
                path: '/home/about',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '@/views/about/About.vue')
            },
        ]
    },
    {
        path: '/photo',
        component: () =>
            import ('@/views/photo/Photo.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router