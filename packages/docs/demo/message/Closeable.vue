<script lang="ts" setup>
import { LiuMessage } from "@xiaoyue789/liu-element";

const open1 = () => {
  LiuMessage({
    showClose: true,
    message: "This is a message.",
  });
};
const open2 = () => {
  LiuMessage({
    showClose: true,
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  LiuMessage({
    showClose: true,
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  LiuMessage({
    showClose: true,
    message: "Oops, this is a error message.",
    type: "danger",
  });
};
</script>

<template>
  <liu-button :plain="true" @click="open1">Message</liu-button>
  <liu-button :plain="true" @click="open2">Success</liu-button>
  <liu-button :plain="true" @click="open3">Warning</liu-button>
  <liu-button :plain="true" @click="open4">Error</liu-button>
</template>
