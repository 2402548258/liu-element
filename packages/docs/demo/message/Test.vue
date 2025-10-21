<script lang="ts" setup>
import { LiuMessage } from "@xiaoyue789/liu-element";

const open1 = () => {
  LiuMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  LiuMessage.success("Congrats, this is a success message.");
};
</script>
<template>
  <div>
    <liu-button @click="open1">插件式调用</liu-button>
    <liu-button @click="open2">函数式调用</liu-button>
    <liu-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</liu-button
    >
  </div>
</template>
