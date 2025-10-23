<script setup lang="ts">
import { LiuMessageBox, LiuMessage } from "@xiaoyue789/liu-element";

function openConfirm() {
  LiuMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", { type: "warning" })
    .then((action) => {
      LiuMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      LiuMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <liu-button @click="openConfirm" plain> Click to open the Confirm</liu-button>
</template>
