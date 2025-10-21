<script lang="ts" setup>
import { LiuNotification } from "@xiaoyue789/liu-element"

const open1 = () => {
  LiuNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};

const open2 = () => {
  LiuNotification({
    title: "Warning",
    message: "This is a warning message",
    type: "warning",
  });
};

const open3 = () => {
  LiuNotification({
    title: "Info",
    message: "This is an info message",
    type: "info",
  });
};

const open4 = () => {
  LiuNotification({
    title: "Error",
    message: "This is an error message",
    type: "danger",
  });
};
</script>

<template>
  <liu-button plain @click="open1"> Success </liu-button>
  <liu-button plain @click="open2"> Warning </liu-button>
  <liu-button plain @click="open3"> Info </liu-button>
  <liu-button plain @click="open4"> Error </liu-button>
</template>
