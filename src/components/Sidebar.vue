<template>
  <aside class="sidebar">
    <div class="menu-section">
      <router-link to="/" class="menu-item" :class="{ active: currentPath === '/' }">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </router-link>
      <!-- <router-link to="/blog" class="menu-item" :class="{ active: currentPath.startsWith('/blog') }">
        <el-icon><Notebook /></el-icon>
        <span>日志</span>
      </router-link> -->
      <router-link to="/album" class="menu-item" :class="{ active: currentPath.startsWith('/album') }">
        <el-icon><Picture /></el-icon>
        <span>相册</span>
      </router-link>
      <!-- <router-link to="/study" class="menu-item" :class="{ active: currentPath.startsWith('/study') }">
        <el-icon><Reading /></el-icon>
        <span>学习资料</span>
      </router-link> -->
      <router-link to="/storage" class="menu-item" :class="{ active: currentPath.startsWith('/storage') }">
        <el-icon><Box /></el-icon>
        <span>存储室</span>
      </router-link>
    </div>

    <div class="menu-section">
      <h3 class="section-title">最近访问</h3>
      <div class="recent-items">
        <a href="#" class="recent-item">
          <el-icon><Document /></el-icon>
          <span>Vue3学习笔记</span>
        </a>
        <a href="#" class="recent-item">
          <el-icon><Picture /></el-icon>
          <span>春季摄影集</span>
        </a>
        <a href="#" class="recent-item">
          <el-icon><Folder /></el-icon>
          <span>项目文档</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  House,
  Notebook,
  Picture,
  Reading,
  Box,
  Document,
  Folder
} from '@element-plus/icons-vue'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background-color: white;
  border-right: 1px solid var(--border-color);
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
}

.menu-section {
  padding: 0 12px;
  margin-bottom: 30px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  margin-bottom: 4px;
}

.menu-item:hover {
  background-color: var(--bg-light);
  color: var(--primary-color);
}

.menu-item.active {
  background-color: var(--primary-color);
  color: white;
}

.menu-item .el-icon {
  font-size: 18px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin: 0 0 12px;
  padding: 0 16px;
  letter-spacing: 0.5px;
}

.recent-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 14px;
}

.recent-item:hover {
  background-color: var(--bg-light);
  color: var(--primary-color);
}

.recent-item .el-icon {
  font-size: 16px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }
}
</style>