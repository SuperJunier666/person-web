<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const route = useRoute()

const currentPath = computed(() => route.path)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <img src="../assets/avatar.svg" alt="Logo" class="logo-avatar" />
        <span class="logo-text">有小小瑕疵</span>
      </router-link>

      <!-- 移动端汉堡菜单按钮 -->
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 导航链接 -->
      <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <router-link 
          to="/home" 
          :class="{ active: currentPath === '/home' }"
          @click="isMenuOpen = false"
        >
          首页
        </router-link>
        <router-link 
          to="/journal" 
          :class="{ active: currentPath === '/journal' }"
          @click="isMenuOpen = false"
        >
          博客
        </router-link>
        <router-link 
          to="/album" 
          :class="{ active: currentPath === '/album' }"
          @click="isMenuOpen = false"
        >
          作品集
        </router-link>
        <router-link 
          to="/storage" 
          :class="{ active: currentPath === '/storage' }"
          @click="isMenuOpen = false"
        >
          关于我
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #E6F0FF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-avatar {
  width: 40px;
  height: 40px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4A90E2;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #4A90E2;
}

.nav-links a.active {
  color: #4A90E2;
  font-weight: bold;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #333;
  margin: 5px 0;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #E6F0FF;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-links.is-open {
    display: flex;
  }

  .logo-text {
    font-size: 1.1rem;
  }
}
</style>