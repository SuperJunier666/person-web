<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SwitchButton, House, Picture, Notebook, Box } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)

// 计算当前路由路径
const currentPath = computed(() => route.path)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    localStorage.removeItem('token')
    ElMessage.success('退出登录成功')
    await router.replace('/login')
  } catch (error) {
    console.error('退出登录时发生错误:', error)
    localStorage.removeItem('token')
    await router.replace('/login')
  }
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <div class="brand-logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span>个人空间</span>
      </router-link>
      
      <nav class="navbar-nav">
        <router-link to="/" class="nav-item" :class="{ active: currentPath === '/' }">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </router-link>
        <router-link to="/storage" class="nav-item" :class="{ active: currentPath.startsWith('/storage') }">
          <el-icon><Box /></el-icon>
          <span>存储</span>
        </router-link>
        <router-link to="/album" class="nav-item" :class="{ active: currentPath.startsWith('/album') }">
          <el-icon><Picture /></el-icon>
          <span>相册</span>
        </router-link>
        <router-link to="/journal" class="nav-item" :class="{ active: currentPath.startsWith('/journal') }">
          <el-icon><Notebook /></el-icon>
          <span>日志</span>
        </router-link>
      </nav>
      
      <div class="navbar-actions">
        <button class="logout-button" @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出</span>
        </button>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <button class="mobile-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'is-active': isMobileMenuOpen }">
      <router-link to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </router-link>
      <router-link to="/storage" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Box /></el-icon>
        <span>存储</span>
      </router-link>
      <router-link to="/album" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Picture /></el-icon>
        <span>相册</span>
      </router-link>
      <router-link to="/journal" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Notebook /></el-icon>
        <span>日志</span>
      </router-link>
      <button class="mobile-nav-item logout-mobile" @click="handleLogout">
        <el-icon><SwitchButton /></el-icon>
        <span>退出登录</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: opacity 0.2s;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.brand-logo {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

.nav-item .el-icon {
  font-size: 16px;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.logout-button .el-icon {
  font-size: 16px;
}

/* 移动端菜单按钮 */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s;
}

.mobile-toggle.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
}

.mobile-menu.is-active {
  transform: translateY(0);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 12px;
  transition: background-color 0.2s;
  font-weight: 500;
  margin-bottom: 8px;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 16px;
}

.mobile-nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.mobile-nav-item .el-icon {
  font-size: 20px;
}

.logout-mobile {
  margin-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 24px;
  color: #ff3b30;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-nav,
  .navbar-actions {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}
</style>