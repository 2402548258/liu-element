<template>
  <i class="liu-icon" :class="{ [`liu-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';
defineOptions({
  name: 'LiuIcon'
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
</script>

<style >
@import './style.css';
</style>