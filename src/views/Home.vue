<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <h1>个人网站</h1>
    <nav>
      <RouterLink to="/storage" class="nav-link">存储</RouterLink>
      <RouterLink to="/album" class="nav-link">相册</RouterLink>
      <RouterLink to="/journal" class="nav-link">日志</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.nav-link {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #2c3e50;
  color: white;
}
</style>