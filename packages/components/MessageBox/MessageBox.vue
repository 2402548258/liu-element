<script setup lang="ts">
import { computed, reactive, type Ref } from 'vue';
import type { MessageBoxAction, MessageBoxProps } from './types';
import LiuButton from '../Button/Button.vue';
import LiuIcon from '../Icon/Icon.vue';
import LiuOverlay from '../Overlay/Overlay.vue';
import LiuInput from '../Input/Input.vue';
import { isFunction, isNil } from 'lodash-es';
import { useId, useZIndex } from '@liu-element/hooks';
import { typeIconMap } from '@liu-element/utils';

defineOptions({
    name:"LiuMessageBox"
})

const props = withDefaults(defineProps<MessageBoxProps>(), {
    lockScroll: true,
    showClose: true,
    closeOnClickModal: true,
    confirmButtonType: "primary",
    roundButton: false,
    boxType: "",
    inputValue: "",
    inputPlaceholder: 'Please input...',
    confirmButtonText: "Ok",
    cancelButtonText: "Cancel",
    showConfirmButton: true,
});

const {doAction} = props
const {nextZIndex} = useZIndex();
const inputId = useId()
const state = reactive({
    ...props,
    zIndex: nextZIndex(),
})

const hasMessage = computed(() => !!state.message)

const iconComponent = computed(() => state.icon??typeIconMap.get(state.type??''))

function handleWrapperClick(){
    if(state.closeOnClickModal) handleAction('close')
}
function handleClose(){
    handleAction('close')
}

function handleInputEnter(e:KeyboardEvent){
    if (state.inputType==='textarea') return
    e.preventDefault()
    handleAction('confirm')
}
function handleAction(action:MessageBoxAction){
    isFunction(state.beforeClose)?
    state.beforeClose(action, state, ()=>doAction(action,state.inputValue)) :
    doAction(action,state.inputValue)
}

</script>

<template>
    <transition name="fade-in-linear" @after-leave="destroy">
        <liu-overlay v-show="state.visible" :z-index="state.zIndex">
            <div role="dialog" class="liu-overlay-message-box" @click="handleWrapperClick">
                <div  ref="rootRef" :class="[
                    'liu-message-box',
                    {
                        'is-center': state.center,
                    },
                ]" @click.stop>
                    <div v-if="!isNil(state.title)" ref="headerRef" class="liu-message-box__header"
                        :class="{ 'show-close': state.showClose }">
                        <div class="liu-message-box__title">
                            <liu-icon v-if="iconComponent && state.center" :class="{
                                [`liu-icon-${state.type}`]: state.type,
                            }" :icon="iconComponent" />
                            {{ state.title }}
                        </div>
                        <button v-if="showClose" class="liu-message-box__header-btn" @click.stop="handleClose">
                            <liu-icon icon="xmark" />
                        </button>
                    </div>
                    <div class="liu-message-box__content">
                        <liu-icon v-if="iconComponent && !state.center && hasMessage" :class="{
                            [`liu-icon-${state.type}`]: state.type,
                        }" :icon="iconComponent" />
                        <div v-if="hasMessage" class="liu-message-box__message">
                            <slot>
                                <component :is="state.showInput ? 'label' : 'p'"
                                    :for="state.showInput ? inputId : void 0">
                                    {{ state.message }}
                                </component>
                            </slot>
                        </div>
                    </div>
                    <div v-show="state.showInput" class="liu-message-box__input">
                        <liu-input v-model="state.inputValue" ref="inputRef" :placeholder="state.inputPlaceholder"
                            :type="state.inputType" @keyup.enter="handleInputEnter" />
                    </div>
                    <div class="liu-message-box__footer">
                        <liu-button v-if="state.showCancelButton"
                            class="liu-message-box__footer-btn liu-message-box__cancel-btn"
                            :type="state.cancelButtonType" :round="state.roundButton"
                            :loading="state.cancelButtonLoading" @click="handleAction('cancel')"
                            @keydown.prevent.enter="handleAction('cancel')">{{
                            state.cancelButtonText }}</liu-button>
                        <liu-button v-show="state.showConfirmButton"
                            class="liu-message-box__footer-btn liu-message-box__confirm-btn"
                            :type="state.confirmButtonType ?? 'primary'" :round="state.roundButton"
                            :loading="state.confirmButtonLoading" @click="handleAction('confirm')"
                            @keydown.prevent.enter="handleAction('confirm')">{{ state.confirmButtonText }}</liu-button>
                    </div>
                </div>
            </div>
        </liu-overlay>
    </transition>
</template>


<style scoped>
@import "./style.css";
</style>