<script setup lang="ts">
import { ref } from 'vue'
// 由于当前代码中未使用 ElMessage，暂时移除该导入
// 如果后续需要使用 ElMessage 进行消息提示，可以重新添加此导入

interface JournalItem {
  id: string
  title: string
  content: string
  createdAt: string
}

const journalList = ref<JournalItem[]>([])
const journalForm = ref({
  title: '',
  content: ''
})

const handleSubmit = () => {
  // TODO: 实现日志提交逻辑
  console.log('提交日志:', journalForm.value)
  journalForm.value = {
    title: '',
    content: ''
  }
}
</script>

<template>
  <div class="journal">
    <h2>个人日志</h2>
    <div class="journal-form">
      <el-form :model="journalForm">
        <el-form-item label="标题">
          <el-input v-model="journalForm.title" placeholder="请输入日志标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="journalForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入日志内容"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="journal-list">
      <el-table :data="journalList" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="{  }">
            <el-button type="primary" size="small" link>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.journal {
  padding: 2rem;
}

.journal-form {
  max-width: 800px;
  margin: 2rem auto;
}

.journal-list {
  margin-top: 2rem;
}
</style>