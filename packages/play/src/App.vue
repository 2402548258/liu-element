<script setup lang="ts">
import type { AlertType } from '@xiaoyue789/liu-element';
import {LiuButton,LiuAlert,LiuSwitch,LiuSelect} from '@xiaoyue789/liu-element'
import { ref } from 'vue';
const args = {
    title: "标题",
        description: "这是一段描述",
        type: "success" as AlertType,
        showIcon: true,
  }

  const switch1 = ref(false)

  const select = ref('')

  const options = ref([
    { value: "1", label: "Zone One" },
    { value: "2", label: "Zone Two" },
    { value: "3", label: "Zone Two" },
    { value: "4", label: "Zone Two" },
]);
</script>

<template>
 <liu-button type="primary" size="default" >
 </liu-button>
 <liu-alert v-bind="args">
 </liu-alert>
 <liu-switch v-model="switch1" activeText="true" inactiveText="false"></liu-switch>
<liu-select v-model="select" placeholder="please select your zone" :options="options" />
</template>

<style scoped>
</style>

