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
    <div class="col">
      <div class="desc">通过 slot 传入 item</div>
      <liu-dropdown>
        <span class="dropdown-link">
          Dropdown List
          <liu-icon icon="angle-down" />
        </span>
        <template #dropdown>
          <liu-dropdown-item command="1" divided>Action 1</liu-dropdown-item>
          <liu-dropdown-item command="2" label="Action 2" divided />
          <liu-dropdown-item command="3" disabled divided>Action 3</liu-dropdown-item>
          <liu-dropdown-item command="4" divided>Action 4</liu-dropdown-item>
        </template>
      </liu-dropdown>
    </div>

    <div class="col">
      <div class="desc">通过 props 传入 item</div>
      <liu-dropdown :items="items" trigger="click">
        <span class="dropdown-link">
          Dropdown List
          <liu-icon icon="angle-down" />
        </span>
      </liu-dropdown>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  /* flex-wrap: wrap; */
}
.col {
  flex: 1;
}
.desc {
  display: block;
  color: var(--liu-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--liu-color-primary);
  i {
    margin-left: 8px;
  }
}
</style>
