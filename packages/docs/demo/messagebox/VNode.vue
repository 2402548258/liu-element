<script setup lang="ts">
import { h, ref } from "vue";
import { LiuMessageBox } from "@xiaoyue789/liu-element";

function open1() {
  LiuMessageBox({
    title: "Message",
    message: h("p", null, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
}

function open2() {
  // const checked = ref<SwitchValueType>(false);
  // LiuMessageBox({
  //   title: "Message",
  //   message: () =>
  //     h(LiuSwitch, {
  //       modelValue: checked.value,
  //       "onUpdate:modelValue": (val: SwitchValueType) => {
  //         checked.value = val;
  //       },
  //     }),
  // });
}
</script>

<template>
  <liu-button @click="open1" plain>Common VNode</liu-button>
  <liu-button @click="open2" plain>Dynamic props</liu-button>
</template>
