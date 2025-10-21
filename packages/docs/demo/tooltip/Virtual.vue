<script setup lang="ts">
import type { ButtonInstance } from '@liu-element/components'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const btnRef = ref<ButtonInstance | null>()
const tooltipRef = ref<any>(null)

// function onEnter() { tooltipRef.value?.show()
//     console.log('btnRef', btnRef.value?.type)
//  }
// function onLeave() { tooltipRef.value?.hide() }

// onMounted(() => {
//     const el = btnRef.value?.ref
//     el?.addEventListener('mouseenter', onEnter)
//     el?.addEventListener('mouseleave', onLeave)
// })
// onBeforeUnmount(() => {
//     const el = btnRef.value?.ref
//     el?.removeEventListener('mouseenter', onEnter)
//     el?.removeEventListener('mouseleave', onLeave)
// })
</script>

<template>
    <liu-button-group>
        <liu-button type="primary">左侧按钮</liu-button>
        <liu-button ref="btnRef">中间按钮</liu-button>
        <liu-button type="primary">右侧按钮</liu-button>
    </liu-button-group>
    <!-- <liu-button ref="btnRef" type="primary">外部按钮</liu-button> -->
    <!-- <button ref="btnRef">外部按钮</button> -->
    <LiuTooltip ref="tooltipRef" content="Hi Tooltip" :virtual-ref="btnRef" virtual-triggering :manual="false"
        placement="top-end" />
</template>
