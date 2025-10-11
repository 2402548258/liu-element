<script setup lang="ts"> 
import { provide, ref ,watch, watchEffect} from "vue";
import type {
    CollapseItemName,
    CollapseProps,
    CollapseEmits,
} from "./types";
import { COLLAPSE_CTX_KEY } from "./constant";
import { debugWarn } from "@liu-element/utils";
const COMPONENT_NAME = "LiuCollapse";
defineOptions({
    name: COMPONENT_NAME,
});
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)
watchEffect(() =>{
    if (props.accordion && props.modelValue.length > 1) {
        debugWarn(COMPONENT_NAME,'accordion模式下，modelValue只能有一个值')
    }
})
function updateActiveNames(newNames: CollapseItemName[]){
    activeNames.value = newNames
    emit("update:modelValue", newNames)
    emit("change", newNames)
}
function handleItemClick(name:CollapseItemName){
    const _activeNames = [...activeNames.value]
 if(props.accordion){
    const _active = name === _activeNames[0] ? '' : name
    updateActiveNames([_active])
 }else{
    const index = _activeNames.indexOf(name)
    if(index > -1){
        _activeNames.splice(index,1)
    }else{
        _activeNames.push(name)
    }
    updateActiveNames(_activeNames)
    }
 }

provide(COLLAPSE_CTX_KEY,{
    activeNames,
    handleItemClick
})
watch(
    () => props.modelValue, 
    (newNames) => updateActiveNames(newNames))


</script>

<template>
    <div class="liu-collapse"> 
        <slot></slot>
    </div>
</template>

<style scoped>
@import "./style.css";
</style>