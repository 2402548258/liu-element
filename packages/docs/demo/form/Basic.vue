<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LiuMessage } from "@xiaoyue789/liu-element";

const form = reactive({
  name: "",
  region: "",
  delivery: false,
  desc: "",
});

const options = ref([
  { value: "beijing", label: "Zone One" },
  { value: "shanghai", label: "Zone Two" },
]);

const onSubmit = () => {
  LiuMessage.success("submit!");
};
</script>

<template>
  <liu-form :model="form">
    <liu-form-item label="Activity name">
      <liu-input v-model="form.name" />
    </liu-form-item>
    <liu-form-item label="Activity zone">
      <liu-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </liu-form-item>
    <liu-form-item label="Instant delivery">
      <liu-switch v-model="form.delivery" />
    </liu-form-item>
    <liu-form-item label="Activity form">
      <liu-input v-model="form.desc" type="textarea" />
    </liu-form-item>
    <liu-form-item>
      <liu-button type="primary" @click="onSubmit">Create</liu-button>
      <liu-button>Cancel</liu-button>
    </liu-form-item>
  </liu-form>
</template>
