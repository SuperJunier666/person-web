<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus, Delete, Edit, Download } from '@element-plus/icons-vue'

// 知识条目数据
const knowledgeItems = ref([
  {
    id: 1,
    title: '前端开发最佳实践',
    category: '前端开发',
    tags: ['JavaScript', 'Vue', '性能优化'],
    summary: '包含现代前端开发的最佳实践和技巧，涵盖性能优化、代码组织和工具使用等方面。',
    content: '这里是详细内容...',
    createdAt: '2023-05-15',
    updatedAt: '2023-06-20'
  },
  {
    id: 2,
    title: 'Node.js 服务端开发指南',
    category: '后端开发',
    tags: ['Node.js', 'Express', 'API设计'],
    summary: '全面介绍使用Node.js进行服务端开发的方法和技巧，包括API设计、数据库集成和性能优化。',
    content: '这里是详细内容...',
    createdAt: '2023-04-10',
    updatedAt: '2023-06-15'
  },
  {
    id: 3,
    title: '人工智能基础知识',
    category: 'AI',
    tags: ['机器学习', '深度学习', 'Python'],
    summary: '介绍人工智能的基础概念、常用算法和实践应用，适合AI领域的初学者。',
    content: '这里是详细内容...',
    createdAt: '2023-03-20',
    updatedAt: '2023-05-30'
  },
  {
    id: 4,
    title: '数据结构与算法',
    category: '计算机科学',
    tags: ['算法', '数据结构', '编程'],
    summary: '详细讲解常见数据结构和算法，包括实现方法、时间复杂度分析和实际应用场景。',
    content: '这里是详细内容...',
    createdAt: '2023-02-05',
    updatedAt: '2023-04-18'
  }
])

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')

// 获取所有分类
const categories = ref([
  '全部',
  '前端开发',
  '后端开发',
  'AI',
  '计算机科学',
  '数据库',
  '移动开发'
])

// 获取所有标签
const tags = ref([
  '全部',
  'JavaScript',
  'Vue',
  'React',
  'Node.js',
  'Python',
  '机器学习',
  '深度学习',
  '算法',
  '数据结构',
  'API设计',
  '性能优化'
])

// 筛选后的知识条目
const filteredItems = computed(() => {
  return knowledgeItems.value.filter(item => {
    // 搜索标题和摘要
    const matchesSearch = searchQuery.value === '' || 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // 筛选分类
    const matchesCategory = selectedCategory.value === '' || 
      selectedCategory.value === '全部' ||
      item.category === selectedCategory.value
    
    // 筛选标签
    const matchesTag = selectedTag.value === '' || 
      selectedTag.value === '全部' ||
      item.tags.includes(selectedTag.value)
    
    return matchesSearch && matchesCategory && matchesTag
  })
})

// 当前查看的知识条目
const currentItem = ref(null)
const isViewingItem = ref(false)

// 查看知识条目详情
const viewItem = (item) => {
  currentItem.value = item
  isViewingItem.value = true
}

// 关闭详情视图
const closeItemView = () => {
  isViewingItem.value = false
  setTimeout(() => {
    currentItem.value = null
  }, 300)
}

// 编辑和删除功能（示例）
const editItem = (item) => {
  ElMessage.info('编辑功能将在后续版本中实现')
  // 实际项目中这里会打开编辑表单
}

const deleteItem = (item) => {
  ElMessage.info('删除功能将在后续版本中实现')
  // 实际项目中这里会显示确认对话框并执行删除操作
}

// 添加新知识条目（示例）
const addNewItem = () => {
  ElMessage.info('添加功能将在后续版本中实现')
  // 实际项目中这里会打开添加表单
}

// 导出知识条目（示例）
const exportItem = (item) => {
  ElMessage.info('导出功能将在后续版本中实现')
  // 实际项目中这里会生成PDF或其他格式的文件并提供下载
}
</script>

<template>
  <div class="knowledge-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>知识集</h1>
      <p class="subtitle">探索、整理和分享您的知识</p>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter-container">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索知识..."
          prefix-icon="Search"
          clearable
        />
      </div>
      
      <div class="filters">
        <el-select v-model="selectedCategory" placeholder="选择分类" clearable>
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
        
        <el-select v-model="selectedTag" placeholder="选择标签" clearable>
          <el-option
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </div>
      
      <el-button type="primary" @click="addNewItem" icon="Plus">
        添加知识
      </el-button>
    </div>
    
    <!-- 知识条目列表 -->
    <div class="knowledge-list" v-if="filteredItems.length > 0">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="knowledge-card"
        @click="viewItem(item)"
      >
        <div class="card-header">
          <h3>{{ item.title }}</h3>
          <div class="category-badge">{{ item.category }}</div>
        </div>
        
        <p class="summary">{{ item.summary }}</p>
        
        <div class="tags">
          <span 
            v-for="(tag, index) in item.tags" 
            :key="index"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="card-footer">
          <span class="date">更新于: {{ item.updatedAt }}</span>
          
          <div class="actions" @click.stop>
            <el-button 
              size="small" 
              circle 
              @click="editItem(item)"
              title="编辑"
            >
              <el-icon><Edit /></el-icon>
            </el-button>
            
            <el-button 
              size="small" 
              circle 
              @click="exportItem(item)"
              title="导出"
            >
              <el-icon><Download /></el-icon>
            </el-button>
            
            <el-button 
              size="small" 
              circle 
              type="danger"
              @click="deleteItem(item)"
              title="删除"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div class="empty-state" v-else>
      <div class="empty-icon">📚</div>
      <h3>没有找到知识条目</h3>
      <p>尝试调整搜索条件或添加新的知识条目</p>
      <el-button type="primary" @click="addNewItem">添加知识</el-button>
    </div>
    
    <!-- 知识条目详情弹窗 -->
    <div class="item-detail-overlay" :class="{ 'active': isViewingItem }" @click="closeItemView">
      <div class="item-detail-container" @click.stop v-if="currentItem">
        <div class="detail-header">
          <h2>{{ currentItem.title }}</h2>
          <div class="detail-meta">
            <div class="category-badge large">{{ currentItem.category }}</div>
            <span class="date">创建于: {{ currentItem.createdAt }}</span>
            <span class="date">更新于: {{ currentItem.updatedAt }}</span>
          </div>
        </div>
        
        <div class="detail-tags">
          <span 
            v-for="(tag, index) in currentItem.tags" 
            :key="index"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="detail-content">
          <p class="summary"><strong>摘要:</strong> {{ currentItem.summary }}</p>
          <div class="content">
            <p>这是知识条目的详细内容。在实际应用中，这里会显示格式化的富文本内容，可能包含标题、段落、列表、代码块、图片等元素。</p>
            <p>您可以在这里查看完整的知识内容，包括详细的解释、示例代码、图表和参考资料等。</p>
            <p>这个示例仅作为界面展示，实际内容将根据每个知识条目的具体内容而定。</p>
          </div>
        </div>
        
        <div class="detail-actions">
          <el-button @click="editItem(currentItem)" icon="Edit">编辑</el-button>
          <el-button @click="exportItem(currentItem)" icon="Download">导出</el-button>
          <el-button type="danger" @click="deleteItem(currentItem)" icon="Delete">删除</el-button>
          <el-button @click="closeItemView">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-container {
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

.search-filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.knowledge-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
}

.knowledge-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color);
}

.category-badge {
  background: linear-gradient(135deg, var(--primary-color) 0%, #64b5f6 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.category-badge.large {
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
}

.summary {
  color: var(--text-color);
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.date {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
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

/* 详情弹窗 */
.item-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.item-detail-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.item-detail-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

.item-detail-overlay.active .item-detail-container {
  transform: scale(1);
}

.detail-header {
  margin-bottom: 1.5rem;
}

.detail-header h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.detail-content {
  margin-bottom: 2rem;
}

.detail-content .summary {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.detail-content .content {
  line-height: 1.6;
  color: var(--text-color);
}

.detail-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .knowledge-container {
    padding: 1rem;
  }
  
  .search-filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box,
  .filters {
    width: 100%;
  }
  
  .knowledge-list {
    grid-template-columns: 1fr;
  }
  
  .item-detail-container {
    padding: 1.5rem;
    width: 95%;
  }
  
  .detail-actions {
    flex-wrap: wrap;
  }
}
</style>