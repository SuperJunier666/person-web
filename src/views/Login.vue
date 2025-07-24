<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 路由实例
const router = useRouter()

// 表单数据
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// 加载状态
const loading = ref(false)

// 背景动画元素
const bubbles = ref([])

// 创建气泡元素
const createBubbles = () => {
  const newBubbles = []
  const count = 15 // 气泡数量
  
  for (let i = 0; i < count; i++) {
    newBubbles.push({
      id: i,
      size: Math.random() * 80 + 20, // 20-100px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
      speed: Math.random() * 20 + 10, // 动画速度
      delay: Math.random() * 5 // 动画延迟
    })
  }
  
  bubbles.value = newBubbles
}

// 登录处理
const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  loading.value = true
  
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里应该是实际的登录API调用
    // const response = await loginApi(username.value, password.value)
    
    // 模拟登录成功
    localStorage.setItem('token', 'demo-token')
    if (rememberMe.value) {
      localStorage.setItem('username', username.value)
    } else {
      localStorage.removeItem('username')
    }
    
    ElMessage.success('登录成功')
    router.push('/home')
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// 切换密码显示状态
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 组件挂载时
onMounted(() => {
  // 创建背景气泡
  createBubbles()
  
  // 检查是否有保存的用户名
  const savedUsername = localStorage.getItem('username')
  if (savedUsername) {
    username.value = savedUsername
    rememberMe.value = true
  }
  
  // 添加视差效果
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50
    const moveY = (e.clientY - window.innerHeight / 2) / 50
    
    const bubblesContainer = document.querySelector('.bubbles-container')
    if (bubblesContainer) {
      bubblesContainer.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  })
})
</script>

<template>
  <div class="login-container">
    <!-- 背景区域 -->
    <div class="background-section">
      <div class="bubbles-container">
        <div 
          v-for="bubble in bubbles" 
          :key="bubble.id"
          class="bubble"
          :style="{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
            animationDuration: `${bubble.speed}s`,
            animationDelay: `${bubble.delay}s`
          }"
        ></div>
      </div>
      <div class="brand-container">
        <h1 class="brand-title">Personal Space</h1>
        <p class="brand-subtitle">您的个人数字空间，安全且私密</p>
      </div>
    </div>
    
    <!-- 登录表单区域 -->
    <div class="form-section">
      <div class="login-form-container">
        <h2 class="form-title">欢迎回来</h2>
        <p class="form-subtitle">请登录您的账户以继续</p>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 用户名输入框 -->
          <div class="form-group">
            <label for="username" class="form-label">用户名或邮箱</label>
            <div class="input-container">
              <i class="input-icon user-icon"></i>
              <input 
                id="username"
                v-model="username"
                type="text" 
                class="form-input"
                placeholder="请输入用户名或邮箱"
                autocomplete="username"
              >
            </div>
          </div>
          
          <!-- 密码输入框 -->
          <div class="form-group">
            <label for="password" class="form-label">密码</label>
            <div class="input-container">
              <i class="input-icon password-icon"></i>
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'" 
                class="form-input"
                placeholder="请输入密码"
                autocomplete="current-password"
              >
              <button 
                type="button"
                class="password-toggle"
                @click="togglePasswordVisibility"
                :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              >
                <i :class="['password-toggle-icon', showPassword ? 'visible' : 'hidden']"></i>
              </button>
            </div>
          </div>
          
          <!-- 记住登录状态 -->
          <div class="form-options">
            <label class="remember-me">
              <div class="toggle-switch">
                <input 
                  type="checkbox" 
                  v-model="rememberMe"
                  id="remember-me"
                >
                <span class="toggle-slider"></span>
              </div>
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>
          
          <!-- 登录按钮 -->
          <button 
            type="submit" 
            class="login-button"
            :disabled="loading"
          >
            <span v-if="!loading">登录</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>
        
        <!-- 注册链接 -->
        <div class="signup-link">
          <span>还没有账户?</span>
          <a href="#">创建账户</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器 */
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #F8F9FA;
}

/* 背景区域 - 左侧 */
.background-section {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

/* 气泡容器 */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
}

/* 气泡元素 */
.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
}

/* 品牌容器 */
.brand-container {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 80%;
}

.brand-title {
  font-size: 3rem;
  font-weight: 600;
  color: #1E3A5F;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 1.2rem;
  color: #64748B;
  max-width: 80%;
  margin: 0 auto;
}

/* 表单区域 - 右侧 */
.form-section {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.03);
}

/* 登录表单容器 */
.login-form-container {
  width: 80%;
  max-width: 400px;
  padding: 2rem 0;
  transition: transform 0.3s ease;
}

.login-form-container:hover {
  transform: translateY(-5px);
}

.form-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1E3A5F;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.form-subtitle {
  font-size: 1rem;
  color: #64748B;
  margin-bottom: 2.5rem;
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1E3A5F;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  opacity: 0.6;
}

.user-icon {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>') no-repeat center center;
}

.password-icon {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>') no-repeat center center;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: #F8FAFC;
  color: #1E3A5F;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background-color: #FFFFFF;
}

.form-input::placeholder {
  color: #A0AEC0;
}

/* 密码显示/隐藏按钮 */
.password-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.password-toggle-icon {
  width: 20px;
  height: 20px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.password-toggle-icon.visible {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>') no-repeat center center;
}

.password-toggle-icon.hidden {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>') no-repeat center center;
}

.password-toggle:hover .password-toggle-icon {
  opacity: 1;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748B;
  cursor: pointer;
}

/* 开关样式 */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2E8F0;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4A90E2;
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px #4A90E2;
}

input:checked + .toggle-slider:before {
  transform: translateX(16px);
}

.forgot-password {
  font-size: 0.9rem;
  color: #4A90E2;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #357ABD;
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.login-button:hover {
  background: linear-gradient(135deg, #357ABD 0%, #2A6DB2 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(53, 122, 189, 0.2);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(53, 122, 189, 0.2);
}

.login-button:disabled {
  background: #A0AEC0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 加载动画 */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 注册链接 */
.signup-link {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #64748B;
}

.signup-link a {
  color: #4A90E2;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: color 0.2s ease;
}

.signup-link a:hover {
  color: #357ABD;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .form-section {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .background-section {
    display: none;
  }
  
  .form-section {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
  
  .login-form-container {
    width: 90%;
    padding: 2rem 0;
  }
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .login-container {
    background-color: #1A202C;
  }
  
  .background-section {
    background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);
  }
  
  .bubble {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .brand-title {
    color: #F7FAFC;
  }
  
  .brand-subtitle {
    color: #A0AEC0;
  }
  
  .form-section {
    background-color: #2D3748;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    color: #F7FAFC;
  }
  
  .form-subtitle {
    color: #A0AEC0;
  }
  
  .form-label {
    color: #E2E8F0;
  }
  
  .form-input {
    border-color: #4A5568;
    background-color: #2D3748;
    color: #F7FAFC;
  }
  
  .form-input:focus {
    border-color: #4A90E2;
    background-color: #3A4A5E;
  }
  
  .form-input::placeholder {
    color: #718096;
  }
  
  .remember-me {
    color: #A0AEC0;
  }
  
  .toggle-slider {
    background-color: #4A5568;
  }
  
  .signup-link {
    color: #A0AEC0;
  }
}
</style>