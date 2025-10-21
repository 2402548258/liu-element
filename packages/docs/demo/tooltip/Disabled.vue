<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
  <liu-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <liu-button @click="disabled = !disabled"
      >click to {{ disabled ? "active" : "close" }} tooltip function</liu-button
    >
  </liu-tooltip>
</template>
