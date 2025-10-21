<script setup lang="ts">
import { type DropdownItemProps } from "@xiaoyue789/liu-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];
</script>

<template>
  <div class="row">
    <liu-dropdown :items="items" size="large" split-button class="first">
      Large List
    </liu-dropdown>
    <liu-dropdown :items="items" split-button> Default List </liu-dropdown>
    <liu-dropdown :items="items" size="small" split-button>
      small List
    </liu-dropdown>
  </div>
</template>

<style scoped>
.row{
.liu-dropdown {
    margin-right: 16px;
  }
}


</style>
