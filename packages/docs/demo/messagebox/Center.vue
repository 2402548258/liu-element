<script setup lang="ts">
import { LiuMessage, LiuMessageBox } from "@xiaoyue789/liu-element";

function openMsgBox() {
  LiuMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      type: "warning",
      center: true,
      // 这里展示一下 不用 Promise 写法的时候
      callback(action) {
        if (action === "confirm") {
          LiuMessage.info(action);
        } else {
          LiuMessage.warning(action as string);
        }
      },
    }
  );
}
</script>

<template>
  <liu-button @click="openMsgBox" plain>Click to open Message Box</liu-button>
</template>
