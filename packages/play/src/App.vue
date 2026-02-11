<script setup lang="ts">
import type { AlertType } from '@xiaoyue789/liu-element';
import {LiuButton,LiuAlert} from '@xiaoyue789/liu-element'
import '@xiaoyue789/liu-element/dist/theme/Button.css'
import '@xiaoyue789/liu-element/dist/theme/Alert.css'
const args = {
    title: "标题",
        description: "这是一段描述",
        type: "success" as AlertType,
        showIcon: true,
  }
</script>

<template>
 <liu-button type="primary" size="default" >
 </liu-button>
 <liu-alert v-bind="args">
 </liu-alert>
</template>

<style scoped>
</style>

