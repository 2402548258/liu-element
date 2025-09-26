<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonEmits, ButtonProps } from './types';
import { throttle } from 'lodash-es';


defineOptions({ name: 'LiuButton' })
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    useThrottle:true,
    throttleDuration:500
})
const slots = defineSlots()
const _ref = ref<HTMLButtonElement>()
const emits = defineEmits<ButtonEmits>()
const handleBtnClick = (e:MouseEvent) => emits('click', e)
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration)
</script>

<template>
    <component :is="props.tag" ref="_ref" class="liu-button" :type="tag === 'button' ? nativeType : void 0"
        :disabled="disabled || loading ? true : void 0" :class="{
            [`liu-button--${type}`]: type,
            [`liu-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }"
        @click="(e:MouseEvent)=> useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)">
        button
    </component>
</template>

<style scoped>
@import './style.css';
</style>