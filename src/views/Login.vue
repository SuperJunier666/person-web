<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()

interface LoginForm {
  username: string
  password: string
}

const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
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
        <div class="form-footer">
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #409EFF 0%, #67C23A 100%);
}

.login-box {
  width: 400px;
  max-width: 90%;
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #303133;
  font-size: 24px;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409EFF;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #409EFF;
}

.form-footer {
  text-align: right;
  margin: -10px 0 10px;
}

.forgot-password {
  color: #909399;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #409EFF;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

@media screen and (max-width: 480px) {
  .login-box {
    padding: 1.5rem;
  }
  
  .login-box h2 {
    font-size: 20px;
    margin-bottom: 1.5rem;
  }
}
</style>