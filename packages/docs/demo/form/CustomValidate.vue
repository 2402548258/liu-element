<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LiuMessage, type FormInstance } from "@xiaoyue789/liu-element";

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  password: "",
  passwordConfirm: "",
});

const rules: any = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  passwordConfirm: [
    {
      required: true,
      trigger: "blur",
      message: "请再次输入密码",
    },
    {
      validator: (_: typeof rules, value: string) => value === form.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
});

const onSubmit = async (instance?: FormInstance) => {
  const valid = await instance?.validate();
  if (!valid) return;
  LiuMessage.success("submit!");
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <liu-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit(formRef)"
    >
    <liu-form-item label="Activity name" prop="name">
      <liu-input v-model="form.name" />
    </liu-form-item>
    <liu-form-item label="Password" prop="password">
      <liu-input v-model="form.password" type="password" showPassword />
    </liu-form-item>
    <liu-form-item label="Password Confirm" prop="passwordConfirm" type="password">
      <liu-input v-model="form.passwordConfirm" type="password" />
    </liu-form-item>
    <liu-form-item>
      <liu-button type="primary" native-type="submit">Create</liu-button>
      <liu-button @click="onReset">Reset</liu-button>
    </liu-form-item>
  </liu-form>
</template>
