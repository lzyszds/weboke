import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/home/index.vue'
import Home from '@/views/home/Home.vue'

const routes = [{
    path: '/',
    redirect: '/home/index' //注意，没有重定向就会出现两个一模一样的home页面
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
        component: () =>
            import('@/views/episit/index.vue')
    },
    {
        path: '/home/YIQ',
        name: 'homeYIQ',
    }
    ]
},
{
    path: '/photo',
    name: 'photo',
    component: () =>
        import('@/views/photo/Photo.vue')
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
