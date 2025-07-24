import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Storage from '../views/Storage.vue'
import Album from '../views/Album.vue'
import Journal from '../views/Journal.vue'
import Knowledge from '../views/Knowledge.vue'
import Tools from '../views/Tools.vue'
import NotFound from '../views/NotFound.vue'

// 简化的认证检查函数
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return token !== null && token !== '' && token !== 'undefined' && token !== 'null'
}

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: () => {
      return isAuthenticated() ? '/home' : '/login'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/storage',
    name: 'Storage',
    component: Storage,
    meta: { requiresAuth: true }
  },
  {
    path: '/album',
    name: 'Album',
    component: Album,
    meta: { requiresAuth: true }
  },
  {
    path: '/journal',
    name: 'Journal',
    component: Journal,
    meta: { requiresAuth: true }
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: Knowledge,
    meta: { requiresAuth: true }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简化的路由守卫
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()
  
  console.log(`路由守卫: ${from.path} -> ${to.path}, 认证状态: ${authenticated}`)
  
  // 如果是登录页面
  if (to.path === '/login') {
    if (authenticated) {
      // 已登录用户访问登录页，重定向到首页
      console.log('已登录用户访问登录页，重定向到首页')
      next({ path: '/home', replace: true })
    } else {
      // 未登录用户正常访问登录页
      next()
    }
    return
  }
  
  // 如果是需要认证的页面
  if (to.meta.requiresAuth) {
    if (!authenticated) {
      // 未登录用户访问需要认证的页面，重定向到登录页
      console.log('未登录用户访问受保护页面，重定向到登录页')
      next({ path: '/login', replace: true })
    } else {
      // 已登录用户正常访问
      next()
    }
    return
  }
  
  // 其他情况正常导航
  next()
})

export default router