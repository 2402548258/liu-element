<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import type { MessageProps } from './type';
import { bind, delay } from 'lodash-es';
import { typeIconMap,RenderVnode, addUnit } from '@liu-element/utils';
import { useOffset } from '@liu-element/hooks';
import { getLastBottomOffset } from './methods';
import { LiuIcon } from '../Icon';


defineOptions({
    name:"LiuMessage"
})

const props = withDefaults(defineProps<MessageProps>(),{
    type: "info",
    duration: 3000,
    offset: 10,
    transitionName: "fade-up",
})
const boxHeight = ref(0)

const messageRef = ref<HTMLDivElement>();

const { topOffset,bottomOffset} = useOffset({
    offset: props.offset,
    boxHeight,
    getLastBottomOffset: bind(getLastBottomOffset, props),
})
const cssStyle = computed(() => {
    return {
        // top: addUnit(topOffset.value),
        top: topOffset.value+'px',
        zIndex: props.zIndex,

    }
})

const iconName = computed(() => {
 return typeIconMap.get(props.type) ?? "circle-info"
})

const visible = ref(false)


function close() {
    visible.value = false
}

let timer:number
function startTimmer() {
    if(props.duration === 0) return;
    timer = delay(close, props.duration)
}

function clearTimer() {
    clearTimeout(timer)
}

watch(visible, (val) => {
    if (!val) boxHeight.value = -props.offset; // 退出动画更流畅
});

onMounted(() => {
    visible.value = true
    startTimmer()
})

defineExpose({
    close,
    bottomOffset
})

</script>

<template>
    <Transition :name="transitionName" @enter="boxHeight = messageRef!.getBoundingClientRect().height"
        @after-leave="!visible && onDestory()">
    <div ref="messageRef" class="liu-message" :class="{
            [`liu-message--${type}`]: type,
            'is-close': showClose,
            'text-center': center,
        }" v-show="visible" role="alert" @mouseenter="clearTimer" @mouseleave="startTimmer" :style="cssStyle">
        <liu-icon class="liu-message__icon" :icon="iconName" />
        <div class="liu-message__content">
            <slot>
                <render-vnode v-if="message" :vNode="message" />
            </slot>
        </div>
        <div class="liu-message__close" v-if="showClose">
            <liu-icon icon="xmark" @click.stop="close" />
        </div>
    </div>
    </Transition>
</template>

<style scoped>
@import "./style.css";
</style>