<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import type { ButtonEmits, ButtonGroupContext, ButtonInstance, ButtonProps } from './types';
import { throttle } from 'lodash-es';
import { LiuIcon } from '../Icon';
import { BUTTON_GROUP_CTX_KEY } from './constant';


defineOptions({ name: 'LiuButton' })
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    useThrottle: true,
    throttleDuration: 500
})
const slots = defineSlots()
const _ref = ref<HTMLButtonElement>()
const ctx = inject<ButtonGroupContext | undefined>(BUTTON_GROUP_CTX_KEY, void 0)
const type = computed(() => {
    return ctx?.type ?? props?.type ?? ''
})
const size = computed(() => {
    return ctx?.size ?? props?.size ?? ''
})
const disabled = computed(() => {
    return ctx?.disabled ?? props?.disabled ?? false
})
const emits = defineEmits<ButtonEmits>()
const handleBtnClick = (e: MouseEvent) => emits('click', e)
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration,{trailing:false})
const iconStyle = computed(() => ({
    marginRight: slots.default ? "6px" : "0px"
}))
defineExpose<ButtonInstance>({
    ref: _ref,
    disabled: disabled,
    size: size,
    type: type

})
</script>

<template>
    <component :is="tag" ref="_ref" class="liu-button" :type="tag === 'button' ? nativeType : void 0"
        :disabled="disabled || loading ? true : void 0" :class="{
            [`liu-button--${type}`]: type,
            [`liu-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }" @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)" >
        <template v-if="loading">
            <slot name="loading">
                <LiuIcon class="loading-icon" :icon="loadingIcon ?? 'spinner' " :style="iconStyle" size="1x" spin>
                </LiuIcon>
            </slot>
        </template>
        <liu-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x"></liu-icon>
        <slot>button</slot>
    </component>


</template>

<style scoped>
@import './style.css';
</style>