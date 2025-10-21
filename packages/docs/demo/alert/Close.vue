<script setup>
// import { ErMessage } from "eric-ui";

function handleClose() {
  // ErMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <liu-alert title="Unclosable alert" type="success" :closable="false" />
    <liu-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
