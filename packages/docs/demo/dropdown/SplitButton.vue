<script setup lang="ts">
import { type DropdownItemProps, type DropdownCommand

 } from "@xiaoyue789/liu-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick(e:DropdownCommand) {
  console.log(e);
  // ErMessage.info("button click");
}
</script>

<template>
  <div class="row">
    <liu-dropdown :items="items" class="first">
      <liu-button type="primary">
        Dropdown List
        <liu-icon icon="angle-down" style="margin-left: 8px" />
      </liu-button>
    </liu-dropdown>

    <liu-dropdown
      :items="items"
      type="primary"
      @command="handleClick"
      split-button
    >
      Dropdown List
    </liu-dropdown>
  </div>
</template>

<style scoped>
.first{
  margin-bottom: 10px;
}

.row div {
  margin-right: 16px;
}

</style>
