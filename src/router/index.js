import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
