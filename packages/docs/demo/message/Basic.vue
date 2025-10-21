<script lang="ts" setup>
import { h } from "vue";
import { LiuMessage } from "@xiaoyue789/liu-element";

const open = () => {
  LiuMessage({
    message: "This is a message.",
  });
};

const openVn = () => {
  LiuMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
};
</script>

<template>
  <liu-button :plain="true" @click="open">Show message</liu-button>
  <liu-button :plain="true" @click="openVn">VNode</liu-button>
</template>
