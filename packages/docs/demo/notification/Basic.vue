<script setup lang="ts">
import { h } from "vue";
import { LiuNotification } from "@xiaoyue789/liu-element";

function openNotify1() {
  LiuNotification({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remider"),
    position: 'bottom-right'
  });
}

function openNotify2() {
  LiuNotification({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
    position: 'top-left'
  });
}
</script>

<template>
  <liu-button @click="openNotify1" plain>Closes automatically</liu-button>
  <liu-button @click="openNotify2" plain>Won't closes automatically</liu-button>
  <liu-button @click="$notify({
    title: 'Prompt',
    message: '$notify',
    position: 'top-left'
  })" plain>$notify</liu-button>
</template>
