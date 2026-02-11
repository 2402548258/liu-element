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
    <liu-button v-loading.lock.fullscreen="loading" type="primary" @click="openLoading1" liu-loading-text="Loading">
      As a directive
    </liu-button>
    <liu-button type="primary" @click="openLoading2"> As a service </liu-button>
  </div>
</template>

<style>
.scroll-container {
  border: 1px solid #ccc;
  padding: 20px;
}


</style>
