<script setup lang="ts">
import { LiuMessageBox, LiuMessage } from "@xiaoyue789/liu-element";

function openAlert() {
  LiuMessageBox.alert("This is a message", "Title",{showCancelButton:true})
    .then((resolve) => {
      LiuMessage.info(`action: ${resolve}`);
    })
    .catch((resolve) => {
      LiuMessage.warning(`action: ${resolve}`);
    });
}
</script>

<template>
  <liu-button @click="openAlert" plain> Click to open the Alert</liu-button>
</template>
