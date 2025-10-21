<script setup>
import { LiuAlert } from "@xiaoyue789/liu-element";
import { ref } from "vue";

const alert = ref();
function handleBtnClick() {
  alert.value.open();
  setTimeout(() => {
    alert.value.close();
  }, 2000);
  // ErMessage.info("btn click");
}
</script>

<template>
  <p>
    <liu-alert title="btn click" type="success" effect="light" closable center
      show-icon ref="alert"></liu-alert>
    <liu-button @click="handleBtnClick"> with throttle</liu-button>
    <liu-button :use-throttle="false" @click="handleBtnClick">without throttle</liu-button>
  </p>
</template>
