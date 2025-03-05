import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('../views/Storage.vue')
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('../views/Album.vue')
  },
  {
    path: '/journal',
    name: 'Journal',
    component: () => import('../views/Journal.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (isAuthenticated()) {
      next('/')
      return
    }
    next()
    return
  }

  if (!isAuthenticated()) {
    next('/login')
    return
  }

  next()
})

export default router