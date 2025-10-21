<script setup lang="ts">
import type { DropdownItemProps, DropdownInstance } from "@xiaoyue789/liu-element";
import { ref } from "vue";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];
const dropdownRef = ref<DropdownInstance>();
</script>

<template>
  <liu-button @click="() => dropdownRef?.open()">open</liu-button>
  <liu-button @click="() => dropdownRef?.close()">close</liu-button>
  <br />
  <liu-dropdown ref="dropdownRef" :items="items">
    <span class="dropdown-link">
      Dropdown List
      <liu-icon icon="angle-down" />
    </span>
  </liu-dropdown>
</template>

<style scoped>
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--liu-color-primary);
  margin-top: 20px;
  i {
    margin-left: 8px;
  }
}
</style>
