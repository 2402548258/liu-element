<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';
import type { AlertEmits, AlertInstance, AlertProps } from './types';
import { typeIconMap } from '@liu-element/utils';
import { LiuIcon } from '../Icon';
defineOptions({
    name: 'LiuAlert'
})
const props =withDefaults(defineProps<AlertProps>(), {
    type: 'info',
    effect: 'light',
    closable: true,
})
const emits = defineEmits<AlertEmits>()
const visible =ref(true)
const close = () => {
    visible.value = false
    emits('close')
}
const slots = useSlots()
const open = ()=>{  visible.value = true}
const withDescription = computed(()=> props.description ?? slots.default)
const iconName = computed(()=> typeIconMap.get(props.type) ?? "circle-info")
defineExpose<AlertInstance>({
    open,
    close
})
</script>

<template>
    <transition name="liu-alert-fade">
        <div v-show="visible" class="liu-alert" role="alert" :class="{
            [`liu-alert__${type}`]: type,
            [`liu-alert__${effect}`]: effect,
            'text-center': center,
        }">
            <liu-icon v-if="showIcon" class="liu-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" />
            <div class="liu-alert__content">
                <span class="liu-alert__title" :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'block' : 'inline' }">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="liu-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="liu-alert__close" v-if="closable">
                    <liu-icon @click.stop="close" icon="xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
@import './style.css';
</style>