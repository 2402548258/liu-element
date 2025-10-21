<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import type { DropdownContext, DropdownEmits, DropdownInstance, DropdownItemProps, DropdownProps } from './types';
import { LiuButtonGroup,LiuButton } from '../Button';
import { LiuDropdownItem } from '.';
import type { TooltipInstance } from '../Tooltip/types';
import type { ButtonInstance } from '../Button';
import {LiuTooltip} from '../Tooltip';
import { omit } from 'lodash-es';
import { DROPDOWN_CTX_KEY } from './constants';
import {useDisabledStyle, useId} from '@liu-element/hooks'

defineOptions({
    name: "LiuDropdown",
});
const props = withDefaults(defineProps<DropdownProps>(), {
    hideOnClick: true,
    items: () => [] as DropdownItemProps[],
});
const tooltipProps = computed(() => omit(props, ["items", "hideOnClick", "size", "type", "splitButton"]))
const emit = defineEmits<DropdownEmits>();
const slots = defineSlots();
const tooltipRef = ref<TooltipInstance>()
const triggerRef = ref<ButtonInstance>();
useDisabledStyle()
function handleItemClick(e: DropdownItemProps) {
    props.hideOnClick && tooltipRef.value?.hide()
    e.command && emit('command', e.command)
}

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
    handleItemClick,
    size: computed(() => props.size),
})

defineExpose<DropdownInstance>({
    open: () => tooltipRef.value?.show(),
    close: () => tooltipRef.value?.hide(),
})
</script>


<template>
    <div class="liu-dropdown" :id="`dropdown-${useId().value}`" :class="{ 'is-disabled': props.disabled }">
        <liu-tooltip ref="tooltipRef" v-bind="tooltipProps" :virtual-triggering="splitButton" :virtual-ref="triggerRef"
            @visible-change="$emit('visible-change', $event)">
            <liu-button-group :type="type" :size="size" :disabled="disabled" v-if="splitButton">
                <liu-button @click="$emit('click', $event)">
                    <slot name="default"></slot>
                </liu-button>
                <liu-button ref="triggerRef" icon="angle-down">
                    <slot name="triggerRef"></slot>
                </liu-button>
            </liu-button-group>
            <slot v-else name="default"></slot>

            <template #content>
                <ul class="liu-dropdown__menu">
                    <slot name="dropdown">
                        <template v-for="item in items" :key="item.command ?? useId().value">
                            <liu-dropdown-item v-bind="item" />
                        </template>
                    </slot>
                </ul>
            </template>
        </liu-tooltip>
    </div>
</template>

<style scoped>
@import './style.css';
</style>