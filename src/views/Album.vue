<script setup lang="ts">
import { ref } from 'vue'
// 由于当前代码中未使用 ElMessage，暂时移除该导入

interface PhotoItem {
  id: string
  url: string
  description: string
}

const photoList = ref<PhotoItem[]>([])

const handleUpload = (file: File) => {
  // TODO: 实现照片上传逻辑
  console.log('上传照片:', file.name)
  return false
}
</script>

<template>
  <div class="album">
    <h2>个人相册</h2>
    <el-upload
      class="upload-area"
      action="/api/albums/upload"
      :auto-upload="false"
      :on-change="handleUpload"
      accept="image/*"
      multiple
    >
      <el-button type="primary">上传照片</el-button>
      <template #tip>
        <div class="el-upload__tip">
          支持jpg/png格式图片
        </div>
      </template>
    </el-upload>

    <div class="photo-grid">
      <div v-for="photo in photoList" :key="photo.id" class="photo-item">
        <el-image
          :src="photo.url"
          :alt="photo.description"
          fit="cover"
          loading="lazy"
        />
        <p class="photo-description">{{ photo.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album {
  padding: 2rem;
}

.upload-area {
  margin: 2rem 0;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.photo-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.photo-description {
  padding: 0.5rem;
  margin: 0;
  text-align: center;
  background-color: #f8f9fa;
}
</style>