<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Setting, ChatDotRound, Close } from '@element-plus/icons-vue'

// 动态背景气泡效果
const bubbles = ref<Array<{x: number, y: number, size: number, speed: number, opacity: number}>>([]);
const animationFrameId = ref<number | null>(null);

// 创建气泡
const createBubbles = () => {
  const count = window.innerWidth < 768 ? 15 : 25;
  const newBubbles = [];
  
  for (let i = 0; i < count; i++) {
    newBubbles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
  
  bubbles.value = newBubbles;
};

// 动画循环
const animateBubbles = () => {
  bubbles.value = bubbles.value.map(bubble => {
    // 向上移动气泡
    const newY = bubble.y - bubble.speed;
    
    // 如果气泡移出视图，重新从底部开始
    if (newY < -10) {
      return {
        ...bubble,
        y: 110,
        x: Math.random() * 100
      };
    }
    
    return {
      ...bubble,
      y: newY
    };
  });
  
  animationFrameId.value = requestAnimationFrame(animateBubbles);
};

// AI聊天相关状态
const isChatOpen = ref(false);
const chatMessages = ref<Array<{role: 'user' | 'assistant', content: string}>>([]);
const currentMessage = ref('');
const isProcessing = ref(false);

// AI配置相关状态
const aiConfig = reactive({
  apiKey: localStorage.getItem('aiApiKey') || '',
  model: localStorage.getItem('aiModel') || 'gpt-3.5-turbo',
  endpoint: localStorage.getItem('aiEndpoint') || 'https://api.openai.com/v1/chat/completions'
});

const isConfigOpen = ref(false);

// 打开/关闭聊天窗口
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

// 打开/关闭配置窗口
const toggleConfig = () => {
  isConfigOpen.value = !isConfigOpen.value;
};

// 保存AI配置
const saveAIConfig = () => {
  localStorage.setItem('aiApiKey', aiConfig.apiKey);
  localStorage.setItem('aiModel', aiConfig.model);
  localStorage.setItem('aiEndpoint', aiConfig.endpoint);
  
  isConfigOpen.value = false;
  ElMessage.success('AI配置已保存');
};

// 发送消息到AI
const sendMessage = async () => {
  if (!currentMessage.value.trim() || isProcessing.value) return;
  
  // 检查API配置
  if (!aiConfig.apiKey) {
    ElMessageBox.confirm('请先配置AI API密钥', '配置提示', {
      confirmButtonText: '去配置',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      isConfigOpen.value = true;
    }).catch(() => {});
    return;
  }
  
  // 添加用户消息
  const userMessage = currentMessage.value;
  chatMessages.value.push({ role: 'user', content: userMessage });
  currentMessage.value = '';
  isProcessing.value = true;
  
  try {
    // 这里是模拟AI响应，实际项目中应该调用真实的API
    // 在实际项目中，您需要实现与OpenAI API或其他AI服务的集成
    setTimeout(() => {
      chatMessages.value.push({ 
        role: 'assistant', 
        content: `这是AI助手的模拟回复。在实际项目中，您需要使用配置的API密钥调用AI服务。您的消息是: "${userMessage}"`
      });
      isProcessing.value = false;
    }, 1000);
    
    /* 实际API调用示例代码（需要在服务端实现或使用代理）
    const response = await fetch(aiConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: [
          ...chatMessages.value,
        ],
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    chatMessages.value.push({ 
      role: 'assistant', 
      content: data.choices[0].message.content 
    });
    */
  } catch (error) {
    ElMessage.error('发送消息失败，请检查网络和API配置');
    console.error('发送消息失败:', error);
  } finally {
    isProcessing.value = false;
  }
};

// 清空聊天记录
const clearChat = () => {
  ElMessageBox.confirm('确定要清空所有聊天记录吗？', '确认清空', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    chatMessages.value = [];
    ElMessage.success('聊天记录已清空');
  }).catch(() => {});
};

// 组件挂载时初始化气泡和动画
onMounted(() => {
  createBubbles();
  animateBubbles();
  
  // 监听窗口大小变化，重新创建气泡
  window.addEventListener('resize', createBubbles);
});

// 组件卸载时清理动画
onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  window.removeEventListener('resize', createBubbles);
});
</script>

<template>
  <div class="home-container">
    <!-- 动态背景气泡 -->
    <div class="bubbles-container">
      <div 
        v-for="(bubble, index) in bubbles" 
        :key="index"
        class="bubble"
        :style="{
          left: `${bubble.x}%`,
          top: `${bubble.y}%`,
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          opacity: bubble.opacity
        }"
      ></div>
    </div>
    
    <div class="content">
      <!-- 品牌标志 -->
      <div class="brand">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1>个人空间</h1>
        <p class="tagline">探索、创造、分享</p>
      </div>
      
      <!-- 导航卡片 -->
      <div class="nav-cards">
        <RouterLink to="/storage" class="nav-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>存储</h3>
            <p>安全存储您的重要文件</p>
          </div>
        </RouterLink>
        
        <RouterLink to="/album" class="nav-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>相册</h3>
            <p>珍藏您的精彩瞬间</p>
          </div>
        </RouterLink>
        
        <RouterLink to="/journal" class="nav-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>日志</h3>
            <p>记录您的思考与灵感</p>
          </div>
        </RouterLink>
        
        <RouterLink to="/knowledge" class="nav-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>知识集</h3>
            <p>探索和分享知识内容</p>
          </div>
        </RouterLink>
        
        <RouterLink to="/tools" class="nav-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>工具</h3>
            <p>实用工具和应用</p>
          </div>
        </RouterLink>
      </div>
    </div>
    
    <!-- AI聊天悬浮球 -->
    <div class="ai-chat-container">
      <!-- 聊天悬浮球按钮 -->
      <button 
        class="chat-ball" 
        :class="{ 'active': isChatOpen }" 
        @click="toggleChat"
        aria-label="AI聊天助手"
      >
        <el-icon><ChatDotRound /></el-icon>
      </button>
      
      <!-- 聊天窗口 -->
      <div class="chat-window" :class="{ 'open': isChatOpen }">
        <div class="chat-header">
          <h3>AI助手</h3>
          <div class="chat-actions">
            <button @click="toggleConfig" class="action-btn" aria-label="设置">
              <el-icon><Setting /></el-icon>
            </button>
            <button @click="toggleChat" class="action-btn" aria-label="关闭">
              <el-icon><Close /></el-icon>
            </button>
          </div>
        </div>
        
        <div class="chat-messages" ref="chatMessagesContainer">
          <div v-if="chatMessages.length === 0" class="empty-chat">
            <p>您好！我是AI助手，有什么可以帮助您的吗？</p>
          </div>
          
          <div 
            v-for="(msg, index) in chatMessages" 
            :key="index" 
            class="message" 
            :class="msg.role"
          >
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            v-model="currentMessage" 
            @keyup.enter="sendMessage" 
            placeholder="输入消息..." 
            :disabled="isProcessing"
          />
          <button @click="sendMessage" :disabled="isProcessing || !currentMessage.trim()">
            发送
          </button>
        </div>
        
        <div class="chat-footer">
          <button @click="clearChat" class="clear-btn">清空聊天</button>
        </div>
      </div>
      
      <!-- AI配置窗口 -->
      <div class="config-window" :class="{ 'open': isConfigOpen }">
        <div class="config-header">
          <h3>AI配置</h3>
          <button @click="toggleConfig" class="action-btn" aria-label="关闭">
            <el-icon><Close /></el-icon>
          </button>
        </div>
        
        <div class="config-content">
          <div class="config-item">
            <label for="api-key">API密钥</label>
            <input 
              id="api-key" 
              v-model="aiConfig.apiKey" 
              type="password" 
              placeholder="输入您的API密钥"
            />
          </div>
          
          <div class="config-item">
            <label for="model">模型</label>
            <select id="model" v-model="aiConfig.model">
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
          </div>
          
          <div class="config-item">
            <label for="endpoint">API端点</label>
            <input 
              id="endpoint" 
              v-model="aiConfig.endpoint" 
              type="text" 
              placeholder="API端点URL"
            />
          </div>
        </div>
        
        <div class="config-footer">
          <button @click="saveAIConfig" class="save-btn">保存配置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-light) 0%, #f5f9ff 100%);
}

/* 动态气泡背景 */
.bubbles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  transform: translateZ(0);
}

/* 内容区域 */
.content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

/* 品牌区域 */
.brand {
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  color: var(--primary-color);
}

.brand h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.tagline {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  font-weight: 300;
}

/* 导航卡片 */
.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
}

.nav-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  box-shadow: 0 8px 32px rgba(0, 31, 63, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
  animation-delay: calc(var(--index, 0) * 0.1s);
}

.nav-card:nth-child(1) {
  --index: 1;
}

.nav-card:nth-child(2) {
  --index: 2;
}

.nav-card:nth-child(3) {
  --index: 3;
}

.nav-card:nth-child(4) {
  --index: 4;
}

.nav-card:nth-child(5) {
  --index: 5;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 31, 63, 0.1);
}

.nav-card:hover::before {
  opacity: 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-right: 1.5rem;
  color: var(--primary-color);
  flex-shrink: 0;
}

.card-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.card-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* AI聊天悬浮球 */
.ai-chat-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chat-ball {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 31, 63, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1001;
  position: relative;
}

.chat-ball:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 31, 63, 0.3);
}

.chat-ball.active {
  transform: scale(0.9);
  box-shadow: 0 2px 10px rgba(0, 31, 63, 0.15);
}

.chat-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 31, 63, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.9);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.chat-window.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: all;
}

.chat-header {
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  text-align: center;
  padding: 1rem;
}

.message {
  max-width: 80%;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  animation: fadeIn 0.3s ease-out;
}

.message.user {
  align-self: flex-end;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant {
  align-self: flex-start;
  background: #f0f0f0;
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
}

.message-content {
  word-break: break-word;
}

.chat-input {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-input input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 20px;
  outline: none;
  transition: border 0.3s ease;
}

.chat-input input:focus {
  border-color: var(--primary-color);
}

.chat-input button {
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.chat-input button:hover {
  transform: translateY(-2px);
}

.chat-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.chat-footer {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.clear-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  transition: background 0.3s ease;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* AI配置窗口 */
.config-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 350px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 31, 63, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.9);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.config-window.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: all;
}

.config-header {
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.config-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.config-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.config-item label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.config-item input,
.config-item select {
  padding: 0.8rem 1rem;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;
}

.config-item input:focus,
.config-item select:focus {
  border-color: var(--primary-color);
}

.config-footer {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  background: linear-gradient(135deg, var(--primary-color) 0%, #6a9fff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
    gap: 3rem;
  }
  
  .brand h1 {
    font-size: 2.5rem;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .nav-cards {
    grid-template-columns: 1fr;
  }
  
  .chat-window,
  .config-window {
    width: calc(100vw - 4rem);
    max-width: 350px;
  }
  
  .chat-ball {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .ai-chat-container {
    right: 1rem;
    bottom: 1rem;
  }
  
  .chat-window,
  .config-window {
    width: calc(100vw - 2rem);
    right: -1rem;
  }
}
</style>