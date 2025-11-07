<script setup>
import { ref } from "vue";
import { LiuLoading } from "@xiaoyue789/liu-element";

const loading = ref(false);

function openLoading1() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

function openLoading2() {
  const _loading = LiuLoading.service({
    lock: true,
    spinner: "circle-notch",
    text: "加载中...",
    background: "rgba(255,255,255,0.5)",
  });
  setTimeout(() => {
    _loading.close();
  }, 2000);
}
</script>

<template>
  <div class="scroll-container">
    <liu-button v-loading="loading" type="primary" @click="openLoading1" liu-loading-text="Loading">
      As a directive
    </liu-button>
    <liu-button type="primary" @click="openLoading2"> As a service </liu-button>

    <!-- 重复足够多的内容来产生滚动条 -->
    <!-- <div v-for="i in 50" :key="i" class="content-item">
      <p>这是第 {{ i }} 段很长很长的内容，用来产生足够的垂直空间...</p>
    </div> -->
  </div>
</template>

<style>
.scroll-container {
  /* height: 400px; */
  /* 固定高度 */
  overflow-y: auto;
  /* 垂直滚动 */
  border: 1px solid #ccc;
  padding: 20px;
}


</style>
