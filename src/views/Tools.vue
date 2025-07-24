<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Link, Delete, Edit, Download, Upload, Refresh } from '@element-plus/icons-vue'

// 工具分类
const categories = [
  { id: 'all', name: '全部工具' },
  { id: 'productivity', name: '生产力工具' },
  { id: 'development', name: '开发工具' },
  { id: 'design', name: '设计工具' },
  { id: 'ai', name: 'AI工具' },
  { id: 'utility', name: '实用工具' }
]

// 工具列表
const tools = ref([
  {
    id: 1,
    name: '代码格式化工具',
    description: '支持多种编程语言的代码格式化工具，可以美化和规范化您的代码。',
    category: 'development',
    icon: '💻',
    url: '#',
    isFavorite: true,
    isLocal: true
  },
  {
    id: 2,
    name: 'Markdown编辑器',
    description: '功能强大的Markdown编辑器，支持实时预览、导出多种格式和自定义主题。',
    category: 'productivity',
    icon: '📝',
    url: '#',
    isFavorite: false,
    isLocal: true
  },
  {
    id: 3,
    name: '图片压缩工具',
    description: '批量压缩图片文件，减小文件大小同时保持良好的图像质量。',
    category: 'utility',
    icon: '🖼️',
    url: '#',
    isFavorite: true,
    isLocal: true
  },
  {
    id: 4,
    name: 'AI文本生成器',
    description: '基于人工智能的文本生成工具，可以创建各种类型的内容，如文章、摘要和创意写作。',
    category: 'ai',
    icon: '🤖',
    url: 'https://example.com/ai-text-generator',
    isFavorite: false,
    isLocal: false
  },
  {
    id: 5,
    name: '调色板生成器',
    description: '创建和管理配色方案，为您的设计项目生成和谐的颜色组合。',
    category: 'design',
    icon: '🎨',
    url: 'https://example.com/color-palette',
    isFavorite: true,
    isLocal: false
  },
  {
    id: 6,
    name: 'JSON解析器',
    description: '格式化和验证JSON数据，支持树状视图和编辑功能。',
    category: 'development',
    icon: '⚙️',
    url: '#',
    isFavorite: false,
    isLocal: true
  },
  {
    id: 7,
    name: '待办事项管理器',
    description: '简单高效的待办事项管理工具，帮助您组织和跟踪任务。',
    category: 'productivity',
    icon: '✅',
    url: '#',
    isFavorite: false,
    isLocal: true
  },
  {
    id: 8,
    name: 'AI图像生成器',
    description: '使用人工智能创建独特的图像和艺术作品，支持多种风格和参数调整。',
    category: 'ai',
    icon: '🎭',
    url: 'https://example.com/ai-image-generator',
    isFavorite: true,
    isLocal: false
  }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 搜索关键词
const searchQuery = ref('')

// 筛选工具
const filteredTools = computed(() => {
  return tools.value.filter(tool => {
    // 分类筛选
    const categoryMatch = selectedCategory.value === 'all' || tool.category === selectedCategory.value
    
    // 搜索筛选
    const searchMatch = searchQuery.value === '' || 
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return categoryMatch && searchMatch
  })
})

// 切换收藏状态
const toggleFavorite = (tool) => {
  tool.isFavorite = !tool.isFavorite
  ElMessage.success(`${tool.isFavorite ? '已添加到' : '已从'}收藏夹${tool.isFavorite ? '' : '移除'}`);
}

// 打开工具
const openTool = (tool) => {
  if (tool.isLocal) {
    ElMessage.info('本地工具将在新窗口打开（示例）')
    // 实际项目中，这里会打开一个新的路由或组件
  } else {
    window.open(tool.url, '_blank')
  }
}

// 添加新工具（示例）
const showAddToolForm = ref(false)
const newTool = reactive({
  name: '',
  description: '',
  category: '',
  icon: '🔧',
  url: '',
  isLocal: false
})

const addTool = () => {
  showAddToolForm.value = true
}

const submitNewTool = () => {
  // 这里是示例，实际项目中会将数据保存到数据库
  ElMessage.success('新工具已添加（示例）')
  showAddToolForm.value = false
  
  // 重置表单
  Object.assign(newTool, {
    name: '',
    description: '',
    category: '',
    icon: '🔧',
    url: '',
    isLocal: false
  })
}

// 编辑工具（示例）
const editTool = (tool) => {
  ElMessage.info('编辑功能将在后续版本中实现')
}

// 删除工具（示例）
const deleteTool = (tool) => {
  ElMessageBox.confirm(
    `确定要删除工具 "${tool.name}" 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 这里是示例，实际项目中会从数据库中删除
    tools.value = tools.value.filter(t => t.id !== tool.id)
    ElMessage.success('工具已删除')
  }).catch(() => {})
}
</script>

<template>
  <div class="tools-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>工具集</h1>
      <p class="subtitle">实用工具和应用集合</p>
    </div>
    
    <!-- 分类和搜索 -->
    <div class="tools-controls">
      <div class="categories">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-btn"
          :class="{ active: selectedCategory === category.id }"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="search-add">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索工具..."
            prefix-icon="Search"
            clearable
          />
        </div>
        
        <el-button type="primary" @click="addTool" icon="Plus">
          添加工具
        </el-button>
      </div>
    </div>
    
    <!-- 工具列表 -->
    <div class="tools-grid" v-if="filteredTools.length > 0">
      <div 
        v-for="tool in filteredTools" 
        :key="tool.id"
        class="tool-card"
      >
        <div class="tool-icon" :class="{ 'external': !tool.isLocal }">
          <span>{{ tool.icon }}</span>
          <span class="external-badge" v-if="!tool.isLocal">外部</span>
        </div>
        
        <div class="tool-content">
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
        </div>
        
        <div class="tool-actions">
          <button 
            class="favorite-btn" 
            :class="{ active: tool.isFavorite }"
            @click="toggleFavorite(tool)"
            :title="tool.isFavorite ? '取消收藏' : '添加到收藏'"
          >
            <span class="star-icon">★</span>
          </button>
          
          <button 
            class="open-btn" 
            @click="openTool(tool)"
          >
            <span>打开</span>
            <el-icon v-if="!tool.isLocal"><Link /></el-icon>
          </button>
          
          <div class="more-actions">
            <el-dropdown trigger="click">
              <span class="more-btn">⋮</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="editTool(tool)">
                    <el-icon><Edit /></el-icon> 编辑
                  </el-dropdown-item>
                  <el-dropdown-item @click="deleteTool(tool)">
                    <el-icon><Delete /></el-icon> 删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div class="empty-state" v-else>
      <div class="empty-icon">🧰</div>
      <h3>没有找到工具</h3>
      <p>尝试调整搜索条件或添加新的工具</p>
      <el-button type="primary" @click="addTool">添加工具</el-button>
    </div>
    
    <!-- 添加工具表单 -->
    <el-dialog
      v-model="showAddToolForm"
      title="添加新工具"
      width="500px"
    >
      <el-form label-position="top">
        <el-form-item label="工具名称">
          <el-input v-model="newTool.name" placeholder="输入工具名称" />
        </el-form-item>
        
        <el-form-item label="描述">
          <el-input 
            v-model="newTool.description" 
            type="textarea" 
            rows="3"
            placeholder="输入工具描述"
          />
        </el-form-item>
        
        <el-form-item label="分类">
          <el-select v-model="newTool.category" placeholder="选择分类">
            <el-option
              v-for="category in categories.filter(c => c.id !== 'all')"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="图标">
          <el-input v-model="newTool.icon" placeholder="输入表情符号作为图标" />
        </el-form-item>
        
        <el-form-item label="工具类型">
          <el-radio-group v-model="newTool.isLocal">
            <el-radio :label="true">本地工具</el-radio>
            <el-radio :label="false">外部链接</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="URL" v-if="!newTool.isLocal">
          <el-input v-model="newTool.url" placeholder="输入工具URL" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddToolForm = false">取消</el-button>
          <el-button type="primary" @click="submitNewTool">添加</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.tools-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #64b5f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.tools-controls {
  margin-bottom: 2rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.category-btn {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: var(--text-color);
}

.category-btn:hover {
  background: rgba(var(--primary-rgb), 0.05);
  border-color: rgba(var(--primary-rgb), 0.2);
}

.category-btn.active {
  background: linear-gradient(135deg, var(--primary-color) 0%, #64b5f6 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.2);
}

.search-add {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  width: 300px;
  max-width: 100%;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.tool-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.15);
}

.tool-icon {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 100%);
  font-size: 3rem;
  position: relative;
  overflow: hidden;
}

.tool-icon.external {
  background: linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, rgba(100, 181, 246, 0.05) 100%);
}

.external-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.tool-content {
  padding: 1.5rem;
  flex: 1;
}

.tool-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--text-color);
}

.tool-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.tool-actions {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.5);
}

.favorite-btn {
  width: 50px;
  background: none;
  border: none;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #ccc;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.8rem 0;
}

.favorite-btn:hover {
  background: rgba(var(--primary-rgb), 0.05);
}

.favorite-btn.active {
  color: #FFD700;
}

.star-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.favorite-btn:hover .star-icon {
  transform: scale(1.2);
}

.open-btn {
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  font-weight: 500;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
}

.open-btn:hover {
  background: rgba(var(--primary-rgb), 0.05);
}

.more-actions {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.more-btn {
  cursor: pointer;
  padding: 0.8rem 0;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease;
}

.more-btn:hover {
  background: rgba(var(--primary-rgb), 0.05);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tools-container {
    padding: 1rem;
  }
  
  .search-add {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    width: 100%;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>