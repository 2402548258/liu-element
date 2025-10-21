<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, LiuConfigProvider } from "@xiaoyue789/liu-element";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
  console.log(language.value);
};
</script>
<template>
  <liu-button @click="changelang" type="info" style="margin-right: 20px">change language</liu-button>
  <liu-config-provider :locale="locale">
  <liu-popconfirm title="Are you shure to delete this item?"  >
    <liu-button>Delete</liu-button>
  </liu-popconfirm>
  </liu-config-provider>
</template>
