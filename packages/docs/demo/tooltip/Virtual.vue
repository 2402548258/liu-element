<script setup lang="ts">
import type { ButtonInstance } from '@liu-element/components'
import { ref } from 'vue'

const btnRef = ref<ButtonInstance | null>(null)

</script>

<template>
    <liu-button-group>
        <liu-button type="primary">左侧按钮</liu-button>
        <liu-button ref="btnRef">中间按钮</liu-button>
        <liu-button type="primary">右侧按钮</liu-button>
    </liu-button-group>
   <LiuTooltip content="Hi Tooltip" :virtual-ref="btnRef?.ref" virtual-triggering placement="top-end" />
</template>
