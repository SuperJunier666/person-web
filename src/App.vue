<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './components/MainLayout.vue'

const route = useRoute()

// 计算是否显示主布局
const showMainLayout = computed(() => {
  return route.path !== '/login'
})
</script>

<template>
  <MainLayout v-if="showMainLayout">
    <router-view></router-view>
  </MainLayout>
  <router-view v-else></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
  --primary-color: #4A90E2;
  --primary-dark: #357ABD;
  --accent-color: #FFB6C1;
  --danger-color: #FF4D4F;
  --text-primary: #1E3A5F;
  --text-secondary: #64748B;
  --bg-light: #F8FAFC;
  --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-light);
}

a {
  text-decoration: none;
  color: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
  line-height: 1.2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: #D32F2F;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-secondary);
}
</style>
