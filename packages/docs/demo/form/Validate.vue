<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LiuMessage, type FormInstance } from "@xiaoyue789/liu-element";
import { each, size } from "lodash-es";


const formRef = ref<FormInstance>();
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

const rules = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

// const rules = reactive({
//   name: [
//     { required: true, message: "请输入活动名称", trigger: "blur" },
//     { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
//   ],
//   region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
//   delivery: [{ type: "boolean", required: true, message: "请确认配送方式", trigger: "change" }],
//   desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
// });


const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      LiuMessage.success("submit!");
    }
  }).catch(
    (err) => {

      // if(size(err.name)>0){
      //   each(err.name, (field) => {
      //     field.validate();
      //   });
      // }
      each(err, (value, key) => {
        LiuMessage.danger(value[0].message);

      })
      // console.log(err);
      // const {name} = err;
      // LiuMessage.danger(name[0].message);
      }
      );
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <liu-form ref="formRef" :model="form" :rules="rules" >
    <liu-form-item label="Activity name" prop="name">
      <liu-input v-model="form.name" />
    </liu-form-item>
    <liu-form-item label="Activity zone" prop="region">
      <liu-select v-model="form.region" placeholder="please select your zone" :options="options" />
    </liu-form-item>
    <liu-form-item label="Instant delivery" prop="delivery">
      <liu-switch v-model="form.delivery" />
    </liu-form-item>
    <liu-form-item label="Activity form" prop="desc">
      <liu-input v-model="form.desc" type="textarea" />
    </liu-form-item>
    <liu-form-item>
      <liu-button type="primary" @click="onSubmit">Create</liu-button>
      <liu-button @click="onReset">Reset</liu-button>
    </liu-form-item>
  </liu-form>
</template>
