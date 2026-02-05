<script setup lang="ts">
import { LiuButton,LiuAlert, type AlertType} from '@xiaoyue789/liu-element';
import { template } from 'lodash-es';
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

