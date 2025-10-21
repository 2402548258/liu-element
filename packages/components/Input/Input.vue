<script lang="ts" setup>
import { computed, nextTick, ref, shallowRef, useAttrs, watch } from 'vue';
import type { InputEmits, InputInstance, InputProps } from './type';
import Icon from '../Icon/Icon.vue';
import { useFocusController } from '@liu-element/hooks';
import { each, noop } from "lodash-es";
import { emit } from 'process';


defineOptions({
    name: "LiuInput"
})

const props = withDefaults(defineProps<InputProps>(), {
    type: "text",
    autocomplete: "off",
});
const attrs = useAttrs()
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue);
const isDisabled = ref(props.disabled)
const passwordVisible = ref(false);
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value ?? textareaRef.value)

const showClear = computed(() => {
    return props.clearable
        && !isDisabled.value
        && isFocused.value
        && !!innerValue.value
})

const showPasswordArea = computed(
    () =>
        props.type === "password" &&
        props.showPassword &&
        !isDisabled.value &&
        !!innerValue.value
);


const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
    afterBlur: () => {
    },
})

const clear = () => {
    innerValue.value = ""
    each(["update:modelValue", "input", "change"], (e) => emits(e as any, ""));
    emits("clear")
}

const blur = () => {
    _ref.value?.blur()
}
const focus = async () => {
    await nextTick()
    _ref.value?.focus()
}

const select = () => {
    _ref.value?.select()
}

const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
}

const handleInput = () => {
    emits("update:modelValue", innerValue.value)
    emits("input", innerValue.value)
}
const handleChange = () => {
    emits("change", innerValue.value)
}

watch(() => props.modelValue,
    (newValue) => innerValue.value = newValue)


defineExpose<InputInstance>({
    ref: _ref,
    focus,
    blur,
    select,
    clear,
})

</script>

<template>
    <div class="liu-input" :class="{
        [`liu-input--${type}`]: type,
        [`liu-input--${size}`]: size,
        'is-disabled': isDisabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocused,
    }">
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="liu-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="liu-input__wrapper" ref="wrapperRef">
                <!-- prefix slot -->
                <span v-if="$slots.prefix" class="liu-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <input class="liu-input__inner" ref="inputRef"
                    :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :disabled="isDisabled"
                    :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                    :form="form" v-model="innerValue" v-bind="attrs" @input="handleInput" @change="handleChange"
                    @focus="handleFocus" @blur="handleBlur" />
                <!-- suffix slot -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="liu-input__suffix">
                    <slot name="suffix"></slot>
                    <Icon icon="circle-xmark" v-if="showClear" class="liu-input__clear" @click="clear"
                        @mousedown.prevent="noop" />
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="liu-input__password"
                        @click="togglePasswordVisible" />
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="liu-input__password"
                        @click="togglePasswordVisible" />
                </span>
            </div>
            <!-- append slot -->
            <div v-if="$slots.append" class="liu-input__append">
                <slot name="append"></slot>
            </div>
        </template>

        <!-- textarea -->
        <template v-else>
            <textarea class="liu-texta  rea__wrapper" ref="textareaRef" :disabled="isDisabled" :readonly="readonly"
                :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus" :form="form"
                v-model="innerValue" v-bind="attrs" @input="handleInput" @change="handleChange" @focus="handleFocus"
                @blur="handleBlur"></textarea>
        </template>
    </div>
</template>


<style scoped>
@import "./style.css";
</style>