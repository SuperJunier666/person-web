<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()

interface LoginForm {
  username: string
  password: string
  rememberMe: boolean // 添加记住密码的状态
}

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  rememberMe: false // 默认不记住密码
})

const loading = ref(false)

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 模拟用户数据
const mockUser = {
  username: 'admin',
  password: 'admin'
}

const handleLogin = () => {
  loading.value = true
  
  // 模拟登录请求
  setTimeout(() => {
    if (loginForm.username === mockUser.username && loginForm.password === mockUser.password) {
      // 登录成功后保存token到localStorage
      localStorage.setItem('token', 'mock-token-value')
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error('用户名或密码错误')
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-box">
      <h2>登录</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            class="custom-input"
          />
        </el-form-item>
        <!-- 记住密码和忘记密码放在同一行 -->
        <div class="form-options">
          <el-checkbox v-model="loginForm.rememberMe" class="remember-me">记住密码</el-checkbox>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleLogin"
            class="login-button"
            round
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
/* 确保 HTML 和 body 占满视口，无白边 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100dvh; /* 使用动态视口高度，确保填满视口 */
  width: 100dvw; /* 使用动态视口宽度，确保填满视口 */
  overflow: hidden; /* 防止滚动条出现 */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  width: 100dvw;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e6f0ff 100%); /* 简洁的浅灰到浅蓝渐变 */
  overflow: hidden;
  position: relative;
}

.login-container::before,
.login-container::after {
  content: '';
  position: absolute;
  width: 120vw; /* 扩展宽度以防止白边 */
  height: 120vh; /* 扩展高度以防止白边 */
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 70%, transparent 100%); /* 优雅的紫绿渐变 */
  filter: blur(50px); /* 增加模糊效果，增强深度 */
  z-index: 0;
  opacity: 0.7; /* 降低透明度，保持背景轻盈 */
}

.login-container::before {
  top: -10vh;
  left: -10vw;
}

.login-container::after {
  bottom: -10vh;
  right: -10vw;
}

/* 保持登录卡片和其他 UI 样式不变 */
.login-box {
  width: 480px;
  max-width: 90%;
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12), 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  margin: 0;
}
.login-box:hover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
}
.login-box h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1e3a5f;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  padding: 10px 16px;
  transition: all 0.3s ease;
  background-color: #f9fafb;
  border: 2px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 添加表单项样式 */
:deep(.el-form-item) {
  margin-bottom: 24px;
  min-height: 78px;
  position: relative;
}

:deep(.el-form-item__error) {
  position: absolute;
  bottom: -20px;
  left: 0;
  padding: 4px 0;
  color: #f56c6c;
  font-size: 13px;
  line-height: 1.2;
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
}

:deep(.el-form-item.is-error) {
  margin-bottom: 24px;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  border-color: #f56c6c;
  box-shadow: 0 0 0 1px rgba(245, 108, 108, 0.1);
}

.custom-input :deep(.el-input__wrapper:hover) {
  background-color: #ffffff;
  border-color: #4a90e2;
  box-shadow: 0 2px 5px rgba(74, 144, 226, 0.2);
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  background-color: #ffffff;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}

/* 记住密码和忘记密码的容器样式 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* 记住密码样式 */
.remember-me {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.remember-me :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

.remember-me :deep(.el-checkbox__input:hover .el-checkbox__inner) {
  border-color: #4a90e2;
}

.remember-me :deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}

/* 忘记密码样式 */
.forgot-password {
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 4px 8px;
  border-radius: 4px;
}

.forgot-password:hover {
  color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.1);
  text-decoration: underline;
}
.login-button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border-radius: 12px;
  background-color: #4a90e2;
  border: none;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.login-button:hover {
  transform: translateY(-3px);
  background-color: #357abd;
  box-shadow: 0 6px 15px rgba(53, 122, 189, 0.4);
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.4);
}

.login-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  box-shadow: none;
}

/* 增强响应式设计，适配更多屏幕尺寸 */
@media screen and (max-width: 768px) {
  .login-box {
    padding: 1.8rem;
    width: 85%;
  }
  
  .login-box h2 {
    font-size: 22px;
    margin-bottom: 1.5rem;
  }
  
  .login-button {
    height: 44px;
    font-size: 15px;
  }
  
  .custom-input :deep(.el-input__wrapper) {
    padding: 8px 14px;
  }

  .remember-me {
    font-size: 13px;
  }
  
  .forgot-password {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .login-box {
    padding: 1.5rem;
    width: 90%;
  }
  
  .login-box h2 {
    font-size: 20px;
    margin-bottom: 1.2rem;
  }
  
  .login-button {
    height: 40px;
    font-size: 14px;
  }
  
  .custom-input :deep(.el-input__wrapper) {
    padding: 6px 12px;
  }
  
  .remember-me {
    font-size: 12px;
  }

  .forgot-password {
    font-size: 12px;
  }
}

/* 针对大屏幕优化 */
@media screen and (min-width: 1024px) {
  .login-box {
    width: 500px;
    padding: 3rem;
  }
  
  .login-box h2 {
    font-size: 30px;
  }
}
</style>