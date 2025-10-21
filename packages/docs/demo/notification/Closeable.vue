<script lang="ts" setup>
import {LiuNotification} from '@xiaoyue789/liu-element'

const open = () => {
  LiuNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  })
}
</script>

<template>
  <liu-button plain @click="open"> Hide close button </liu-button>
</template>