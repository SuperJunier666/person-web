<template>
  <div class="layout-container">
    <Navbar />
    
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './NavBar.vue'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  background-image: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
}

.main-content {
  flex: 1;
  margin-top: 60px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0;
  }
}
</style>