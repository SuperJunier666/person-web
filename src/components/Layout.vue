<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<template>
  <div class="layout">
    <header class="header">
      <NavBar />
    </header>
    
    <aside class="sidebar">
      <!-- 侧边栏内容将在后续添加 -->
      <div class="sidebar-content">
        <h3>导航菜单</h3>
        <nav class="side-nav">
          <ul>
            <li><a href="#">最新文章</a></li>
            <li><a href="#">项目展示</a></li>
            <li><a href="#">技术分享</a></li>
            <li><a href="#">关于我</a></li>
          </ul>
        </nav>
      </div>
    </aside>
    
    <main class="main-content">
      <!-- 主要内容区域，将通过路由显示不同页面内容 -->
      <router-view></router-view>
    </main>
    
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 有小小瑕疵. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
  width: 100%;
}

.sidebar {
  grid-area: sidebar;
  background-color: #f5f7fa;
  border-right: 1px solid #e6e9ed;
  padding: 1rem;
}

.sidebar-content {
  position: sticky;
  top: 80px;
}

.side-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav li {
  margin-bottom: 0.5rem;
}

.side-nav a {
  color: #333;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.side-nav a:hover {
  background-color: #E6F0FF;
  color: #4A90E2;
}

.main-content {
  grid-area: main;
  padding: 2rem;
  margin-top: 60px; /* 为固定导航栏留出空间 */
  background-color: #fff;
}

.footer {
  grid-area: footer;
  background-color: #E6F0FF;
  padding: 1rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr auto auto;
  }

  .sidebar {
    border-right: none;
    border-top: 1px solid #e6e9ed;
  }

  .sidebar-content {
    position: static;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>