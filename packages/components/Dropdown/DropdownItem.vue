<script setup lang="ts">
import { computed, inject } from 'vue';
import type { DropdownItemProps } from './types';
import { useId } from '@liu-element/hooks';
import { DROPDOWN_CTX_KEY } from './constants';
defineOptions({
    name: "LiuDropdownItem",
});
const props = withDefaults(defineProps<DropdownItemProps>(), {
    divided: false,
    disabled: false,
});
const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => {
    return ctx?.size.value
})
function handleClick() {

    if(props.disabled) return
    ctx?.handleItemClick(props)
}

</script>

<template>
    <li v-if="divided" role="separator" class="divided-placeholder"></li>
    <li :id="`dropdown-item-${command ?? useId().value}`" :class="{
        'liu-dropdown__item': true,
        ['liu-dropdown__item--' + size]: size,
        'is-disabled': disabled,
        'is-divided': divided,
    }" @click="handleClick">
        <slot>
            {{ label }}
        </slot>
    </li>
</template>

<style scoped>
@import './style.css';
</style>