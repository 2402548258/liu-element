<script setup lang="ts">
import { LiuButton,LiuAlert, type AlertType} from '@xiaoyue789/liu-element';
import { template } from 'lodash-es';
const args = {
    title: "标题",
        description: "这是一段描述",
        type: "success" as AlertType,
        showIcon: true,
  }
</script>

<template>
 <liu-button type="primary" size="default" >
 </liu-button>
 <liu-alert v-bind="args">
 </liu-alert>
</template>


<!-- <template>
    <div class="captcha-input">
        <input v-for="(item, index) in captchaLength" :key="index" type="text" v-model="captcha[index]" maxlength="1"
            ref="captchaInputs" class="captcha-box" @input="onInput(index)" :disabled="index !== 0 && captcha[index - 1] === ''"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const captchaLength = 6; // 验证码的长度
const captcha = ref(Array(captchaLength).fill('')); // 初始化验证码数组

const captchaInputs = ref([]); // 用来存储所有输入框的引用

// 当用户输入时触发
const onInput = (index) => {
    // 如果当前输入框已输入内容，并且不是最后一个输入框，则将焦点移到下一个输入框
    if (captcha[index] !== '' && index < captchaLength - 1) {
        captchaInputs.value[index + 1].focus();
    }
    // 如果当前输入框为空，则让焦点留在当前位置
}; -->
<!-- </script> -->

<style scoped>
</style>

