<script setup lang="ts">
import { computed, inject } from "vue";
import type {
    CollapseItemProps,
    CollapseContext,
} from "./types";
import { COLLAPSE_CTX_KEY } from "./constant";
import LiuIcon from "../Icon/Icon.vue";
import  transitionEvents from "./transitionEvents";
defineOptions({
    name: "LiuCollapseItem",
});
const props = defineProps<CollapseItemProps>()
const ctx = inject<CollapseContext>(COLLAPSE_CTX_KEY)
const isActive = computed(() => {
    return ctx?.activeNames.value.includes(props.name)
})
function handleClick() {
    if(props.disabled) return
    ctx?.handleItemClick(props.name)
}


</script>

<template>
    <div class="liu-collapse-item" :class="{
        'is-disabled': disabled,
    }">
        <div class="liu-collapse-item__header" :id="`item-header-${name}`" :class="{
            'is-disabled': disabled,
            'is-active': isActive,
        }" @click="handleClick">
            <span class="liu-collapse-item__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <liu-icon icon="angle-right" class="header-angle" />
        </div>
        <transition name="slide"  v-on="transitionEvents">
            <div class="liu-collapse-item__wapper" v-show="isActive" >
                <div class="liu-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import "./style.css";
</style>