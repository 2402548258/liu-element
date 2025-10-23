<script setup lang="ts">
import { LiuMessageBox, LiuMessage } from "@xiaoyue789/liu-element";

function openConfirm() {
  LiuMessageBox.prompt("Place input your name", "Tip", { type: "info" })
    .then(({ value }) => {
      LiuMessage.info(`your name is: ${value}`);
    })
    .catch((action) => {
      LiuMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <liu-button @click="openConfirm" plain> Click to open the Confirm</liu-button>
</template>
