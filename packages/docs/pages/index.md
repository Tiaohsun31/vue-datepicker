---
layout: home
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // 檢測用戶語言偏好
  const userLanguage = navigator.language || navigator.languages[0]
  
  if (userLanguage.startsWith('zh')) {
    router.go('/zh-tw/')
  } else {
    router.go('/en-us/')
  }
})
</script>

<template>
  <div>
    <h1>Redirecting...</h1>
    <p>
      <a href="/en-us/">English</a> | 
      <a href="/zh-tw/">繁體中文</a>
    </p>
  </div>
</template>
