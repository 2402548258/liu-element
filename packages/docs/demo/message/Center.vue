<script lang="ts" setup>
import { LiuMessage } from "@xiaoyue789/liu-element";

const openCenter = () => {
  LiuMessage({
    showClose: true,
    message: "Centered text",
    center: true
  });
};
</script>

<template>
  <liu-button plain @click="openCenter">Centered text</liu-button>
</template>
