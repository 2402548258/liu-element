---
search: false
next:
  link: /components/button
  text: Button 按钮
---
#  Vue3 + TS 高仿 ElementPlus 

## 安装


```bash
npm i @xiaoyue789/liu-element --save
```

## 开始使用

**全局使用**


```js
// 引入所有组件
import LiuElement from '@xiaoyue789/liu-element'
// 引入样式
import '@xiaoyue789/liu-element/css'

import App from './App.vue'
// 全局使用
createApp(App).use(LiuElement).mount('#app')
```

```vue
<template>
  <liu-button>我是 Button</liu-button>
</template>
```

**单个导入**

liu-element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。


```vue
<template>
  <liu-button>我是 Button</liu-button>
</template>
<script>
  import { LiuButton } from '@xiaoyue789/liu-element'
  export default {
    components: { LiuButton },
  }
</script>
```

## 亮点

::: details
- 支持按需引入与全局注册双模式
- 基于 Vite 双配置输出 ES / UMD
- monorepo 分包管理
- github actions 实现 CI/CD 自动化部署
- 大模型辅助：使用大模型辅助完成需求分析，设计思路，快速实现组件，提升开发效率。
:::