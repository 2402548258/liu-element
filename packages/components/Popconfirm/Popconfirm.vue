<script setup lang="ts">
import type { PopconfirmEmits, PopconfirmProps } from './types';
import { LiuButton } from '../Button';
import { LiuTooltip, type TooltipInstance } from '../Tooltip';
import { LiuIcon } from '../Icon';
import { computed, inject, ref } from 'vue';
import { addUnit } from '@liu-element/utils';
import { useLocale } from '@liu-element/hooks';
defineOptions({
    name: "LiuPopconfirm",
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: "",
    confirmButtonType: "primary",
    icon: "question-circle",
    iconColor: "#f90",
    hideAfter: 200,
    width: 150,
});
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }))
const emits = defineEmits<PopconfirmEmits>();
const hidePopper = () => {
    tooltipRef.value?.hide();
}
const confirm = (e: MouseEvent) => {
    emits("confirm", e);
    hidePopper();
}
const cancel = (e: MouseEvent) => {
    emits("cancel", e);
    hidePopper();
}
// const useI18n = inject()
const { t } = useLocale();

</script>

<template>
    <liu-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template #content>
            <div class="liu-popconfirm" :style="style">
                <div class="liu-popconfirm__main">
                    <liu-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
                    {{ title }}
                </div>
                <div class="liu-popconfirm__action">
                    <liu-button size="small" class="liu-popconfirm__cancel" :type="cancelButtonType" @click="cancel">
                        <!-- {{ cancelButtonText??'Cancel' }} -->
                        {{ cancelButtonText || t("popconfirm.cancelButtonText") }}
                    </liu-button>
                    <liu-button size="small" class="liu-popconfirm__confirm" :type="confirmButtonType" @click="confirm">
                        <!-- {{ confirmButtonText??'Confirm' }} -->
                        {{ confirmButtonText || t("popconfirm.confirmButtonText") }}
                    </liu-button>
                </div>
            </div>
        </template>

        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>

        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
    </liu-tooltip>
</template>

<style scoped>
@import './style.css';
</style>