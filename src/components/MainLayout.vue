<template>
  <div class="layout-container">
    <Navbar />
    <Sidebar />
    
    <main class="main-content">
      <div class="content-grid">
        <slot></slot>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './NavBar.vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 60px;
  margin-left: 240px;
  padding: 20px;
  background-color: var(--bg-light);
}

.content-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 15px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style> 