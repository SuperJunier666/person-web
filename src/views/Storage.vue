<script setup lang="ts">
import { ref } from 'vue'


interface FileItem {
  id: string
  name: string
  size: number
}

const fileList = ref<FileItem[]>([])

const handleUpload = (file: File) => {
  // TODO: 实现文件上传逻辑
  console.log('上传文件:', file.name)
  return false
}

const handleDelete = (id: string) => {
  // TODO: 实现文件删除逻辑
  console.log('删除文件:', id)
}
</script>

<template>
  <div class="storage">
    <h2>文件存储</h2>
    <el-upload
      class="upload-area"
      drag
      action="/api/storage/upload"
      :auto-upload="false"
      :on-change="handleUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到此处或 <em>点击上传</em>
      </div>
    </el-upload>

    <div class="file-list">
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="name" label="文件名" />
        <el-table-column prop="size" label="大小" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.storage {
  padding: 2rem;
}

.upload-area {
  margin: 2rem 0;
}

.file-list {
  margin-top: 2rem;
}
</style>