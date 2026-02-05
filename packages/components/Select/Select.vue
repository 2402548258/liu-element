<script setup lang="ts">
import {
    assign,
    find,
    get,
    each,
    noop,
    isFunction,
    filter,
    isNil,
    isBoolean,
    includes,
    map,
    size,
    eq,
    debounce,
} from "lodash-es";
import {
    ref,
    reactive,
    computed,
    onMounted,
    provide,
    useSlots,
    watch,
    h,
    nextTick,
    type Ref,
    type VNode,
} from "vue";
import type {
    SelectProps,
    SelectEmits,
    SelectOptionProps,
    SelectContext,
    SelectInstance,
    SelectStates,
    CustomFilterRemoteFunc,
} from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import { RenderVnode, debugWarn } from "@liu-element/utils";
import { useFocusController, useClickOutside, useId } from "@liu-element/hooks";
import { SELECT_CTX_KEY } from "./constants";
import liuTooltip from "../Tooltip/Tooltip.vue";
import liuIcon from "../Icon/Icon.vue";
import liuInput from "../Input/Input.vue";
import LiuOption from "./Option.vue";
import useKeyMap from "./useKeyMap";
;


defineOptions({
    name: 'LiuSelect',
})
const props = withDefaults(defineProps<SelectProps>(), {
    options: () => []
})

const emits = defineEmits<SelectEmits>()
const slots = useSlots()
// const initOptions = findOp
const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()
const isDisabled = computed(() => props.disabled)
const inputId = useId().value
const isDropdownVisible = ref(false)
const initOptions = findOption(props.modelValue)
const filteredChilds = ref<Map<VNode, SelectOptionProps>>(new Map())
const filteredOptions = ref(props.options ?? []);
// const filteredOptions: Ref<SelectOptionProps[]|void> = ref(props.options ?? [])
const selectStates = reactive<SelectStates>({
    inputValue: initOptions?.label || "",
    selectedOption: initOptions,
    mouseHover: false,
    loading: false,
    highlightedIndex: -1,
})
const children = computed(() => filter(slots.default?.(), (child) => eq(child.type, LiuOption)))
const hasChildren = computed(() => children.value.length > 0)
const isNoData = computed(() => {
    if(!props.filterable) return false
    if (!hasData.value)return true
    return false
})
const hasData = computed(() => {
    return (hasChildren.value && filteredChilds.value.size > 0) || (!hasChildren.value && size(filteredOptions) > 0)
})

const lastIndex = computed(() => {
    return hasChildren.value
        ? filteredChilds.value.size - 1
        : size(filteredOptions) - 1
})
function findOption(value: string) {
    return find(props.options, (opt) => opt.value === value)
}

const {
    wrapperRef: inputWrapperRef,
    isFocused,
    handleBlur,
    handleFocus,
} = useFocusController(inputRef)



const childrenOptions = computed(() => {
    if (!hasChildren.value) return
    return map(children.value, (item) => ({
        VNode: h(item),
        props: assign(item.props, {
            disabled: item.props?.disabled === true || !isNil(item.props?.disabled) && !isBoolean(item.props?.disabled)
        }) as SelectOptionProps

    }))
})

const filterPlaceholder = computed(() => {
    return props.filterable && selectStates.selectedOption && isDropdownVisible.value ? selectStates.selectedOption.label : props.placeholder
})

const timeout = computed(() => props.remote ? 300 : 100)

const handleFilterDebounce = debounce(handleFilter, timeout.value)
function handleFilter() {
    const search = selectStates.inputValue
    selectStates.highlightedIndex = -1
    if (hasChildren.value) {
        genFilterChilds(search)
        return
    }
    genFilterOptions(search)
}
async function genFilterChilds(search: string) {
    if (!props.filterable) return
    if (props.remote && isFunction(props.remoteMethod)) {
        await callRemoteMethod(props.remoteMethod, search) || []
        setFilterChild(childrenOptions.value);
        return
    }
    if (props.filterMethod && props.filterMethod && isFunction(props.filterMethod)) {
        const opts = map(props.filterMethod(search), (item) => item.value)
        setFilterChild(filter(childrenOptions.value, (item) => includes(opts, item.props?.value)))
        return
    }
    setFilterChild(filter(childrenOptions.value, (item) => includes(item.props?.label, search)))
}
async function genFilterOptions(search: string) {
    if (!props.filterable) return
    if (props.remote && isFunction(props.remoteMethod)) {
        filteredOptions.value = await callRemoteMethod(props.remoteMethod, search) || []
        return
    }
    if (props.filterMethod && props.filterMethod && isFunction(props.filterMethod))  {
        filteredOptions.value = props.filterMethod(search)
        return
    }
    filteredOptions.value = filter(props.options, (opt) => opt.label.includes(search))
}

function setFilterChild(opts: typeof childrenOptions.value) {
    filteredChilds.value.clear()
    each(opts, (opt) => {
        filteredChilds.value.set(opt.VNode, opt.props)
    })
}
async function callRemoteMethod(methods: CustomFilterRemoteFunc, search: string) {
    if (!methods && !isFunction(methods)) return
    let result
    try {
        result = await methods(search)
    } catch (error) {
        debugWarn(error as Error)
        debugWarn("LiuSelect", "remoteMethod error")
        result = []
        return Promise.reject(error)
    }
    return result
}


const showClear = computed(() => {
    return props.clearable && selectStates.mouseHover && selectStates.inputValue !== ''
})


function controlVisible(visible: boolean) {
    if (!tooltipRef.value) return
    get(tooltipRef, ["value", visible ? "show" : "hide"])?.();
    isDropdownVisible.value = visible
    if (props.filterable) controlInputVal(visible)
    emits("visible-change", visible)
    selectStates.highlightedIndex = -1
}
function controlInputVal(visible: boolean) {
    if (!props.filterable) return
    if (visible) {
        if (selectStates.selectedOption) selectStates.inputValue = ''
        handleFilterDebounce()
        return
    }
    selectStates.inputValue = selectStates.selectedOption?.label || ''

}

function renderLabel(opt: SelectOptionProps) {
    if (isFunction(props.renderLabel)) {
        return props.renderLabel(opt)
    }
    return opt.label
}

function handleClear() {
    inputRef.value?.clear()
    selectStates.inputValue = ''
    selectStates.selectedOption = null
    emits("clear")
    each(["change", "update:modelValue"], (k) => emits(k as any, ""))
}
function handleSelect(opt: SelectOptionProps) {
    if (opt.disabled) return
    selectStates.inputValue = opt.label
    selectStates.selectedOption = opt
    each(["change", "update:modelValue"], (k) => emits(k as any, opt.value))
    controlVisible(false)
    inputRef.value?.focus()
}
const highlightedLine = computed(() => {
    let result: SelectOptionProps | void
    if (hasChildren.value) {
        // const node = children.value[selectStates.highlightedIndex]
        result = [...filteredChilds.value][selectStates.highlightedIndex][1]
        // result = node?.props?.value
    } else {
        result = filteredOptions.value?.[selectStates.highlightedIndex]
    }
    return result
})


function toggleVisible() {
    if (isDisabled.value) return
    controlVisible(!isDropdownVisible.value)
}

const keyMap = useKeyMap({
    isDropdownVisible,
    controlVisible,
    selectStates,
    highlightedLine,
    handleSelect,
    hasData,
    lastIndex,
});

function handleKeyDown(e: KeyboardEvent){
    keyMap.has(e.key) && keyMap.get(e.key)?.(e)
}
const focus: SelectInstance['focus'] = () => {
    inputRef.value?.focus()
}
const blur: SelectInstance['blur'] = () => {
    handleClickOutside()
}

useClickOutside(selectRef, (e) => handleClickOutside(e))
const handleClickOutside = (e?: Event) => {
    if (isFocused.value) {
        nextTick(() => handleBlur(new FocusEvent('focus', e)))
    }
}

watch(() => props.options,
    (val) => {
        filteredOptions.value = val ?? []
    })
watch(() => childrenOptions.value,
    (val) => setFilterChild(val),
    {
        immediate: true
    })

provide<SelectContext>(SELECT_CTX_KEY, {
    selectStates,
    renderLabel,
    highlightedLine,
    handleSelect
})



defineExpose<SelectInstance>({
    focus,
    blur
})
</script>



<template>
    <div ref="selectRef" class="liu-select" :class="{
        'is-disabled': isDisabled,
    }" @click.stop="toggleVisible" @mouseenter="selectStates.mouseHover = true"
        @mouseleave="selectStates.mouseHover = false">
        <liu-tooltip ref="tooltipRef" placement="bottom-start" 
            @click-outside="controlVisible(false)" manual>
            <template #default>
                <div ref="inputWrapperRef">
                    <liu-input ref="inputRef" v-model="selectStates.inputValue" :id="inputId" :disabled="isDisabled"
                        :placeholder="filterable ? filterPlaceholder : placeholder"
                        :readonly="!filterable || !isDropdownVisible" @focus="handleFocus" @blur="handleBlur"
                        @input="handleFilterDebounce" @keydown="handleKeyDown">
                        <template #suffix>
                            <liu-icon v-if="showClear" icon="circle-xmark" class="liu-input__clear"
                                @click.stop="handleClear" @mousedown.prevent="noop" />
                            <liu-icon v-else class="header-angle" icon="angle-down"
                                :class="{ 'is-active': isDropdownVisible }" />
                        </template>
                    </liu-input>
                </div>
            </template>
            <template #content>
                <div class="liu-select__loading" v-if="selectStates.loading">
                    <liu-icon icon="spinner" spin />
                </div>
                <div class="liu-select__nodata" v-else-if="filterable && isNoData">
                    No data
                </div>
                <ul class="liu-select__menu" v-else>
                    <template v-if="!hasChildren">
                        <liu-option v-for="item in filteredOptions" :key="item.value" v-bind="item" />
                    </template>
                    <template v-else>
                        <template v-for="[vNode, _props] in filteredChilds" :key="_props.value">
                            <render-vnode :vNode="vNode" />
                        </template>
                    </template>
                </ul>
            </template>
        </liu-tooltip>
    </div>
</template>