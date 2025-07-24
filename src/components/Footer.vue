<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">关于本站</h3>
          <p class="footer-text">这是一个记录学习、生活和创作的个人空间</p>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">快速链接</h3>
          <div class="footer-links">
            <!-- <router-link to="/about" class="footer-link">关于我</router-link>
            <router-link to="/contact" class="footer-link">联系方式</router-link> -->
            <a href="/sitemap" class="footer-link">网站地图</a>
          </div>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">联系方式</h3>
          <div class="footer-contact">
            <a href="mailto:contact@example.com" class="footer-link">
              <el-icon><Message /></el-icon>
              邮箱联系
            </a>
            <a href="https://github.com" target="_blank" class="footer-link">
              <el-icon><Link /></el-icon>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2024 一个人站. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="/privacy" class="footer-link">隐私政策</a>
          <a href="/terms" class="footer-link">使用条款</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Message, Link } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer {
  background-color: var(--bg-light);
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.footer-text {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-bottom {
  padding-top: 20px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: var(--text-secondary);
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}
</style>