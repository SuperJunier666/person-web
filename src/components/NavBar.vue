<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, Notebook, Picture, Reading, Box, CaretBottom, User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { userService } from '../services/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    await userService.logout()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    console.error('退出登录时发生错误:', error)
    router.push('/login')
  }
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    handleLogout()
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">个人网站</router-link>
      
      <div class="navbar-right">
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="avatar-wrapper">
            <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <el-icon class="el-icon--right"><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <router-link to="/profile" class="dropdown-link">
                  <el-icon><User /></el-icon>
                  个人资料
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <router-link to="/settings" class="dropdown-link">
                  <el-icon><Setting /></el-icon>
                  设置
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span class="dropdown-link">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 移动端菜单按钮 -->
        <div class="mobile-toggle" @click="toggleMobileMenu">
          <el-icon><Menu /></el-icon>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'is-active': isMobileMenuOpen }">
      <router-link to="/blog" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Notebook /></el-icon>
        日志
      </router-link>
      <router-link to="/album" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Picture /></el-icon>
        相册
      </router-link>
      <router-link to="/study" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Reading /></el-icon>
        学习资料
      </router-link>
      <router-link to="/storage" class="mobile-nav-item" @click="closeMobileMenu">
        <el-icon><Box /></el-icon>
        存储室
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.avatar-wrapper:hover {
  background-color: var(--primary-dark);
}

.avatar-wrapper .el-icon {
  color: white;
  font-size: 12px;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  text-decoration: none;
}

:deep(.el-dropdown-menu__item) {
  padding: 8px 16px;
}

:deep(.el-dropdown-menu__item .el-icon) {
  margin-right: 0;
}

.mobile-toggle {
  display: none;
  color: white;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 10px;
  box-shadow: var(--shadow-md);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.mobile-menu.is-active {
  transform: translateY(0);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.mobile-nav-item:hover {
  background-color: var(--bg-light);
}

@media (max-width: 768px) {
  .navbar-right {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: block;
  }
}
</style>