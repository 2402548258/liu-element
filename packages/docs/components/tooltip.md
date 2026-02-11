---
title: Tooltip
description: Tooltip 组件文档

next:
  link: /components/form
  text: Form 表单

prev:
  link: /components/popconfirm
  text: Popconfirm 气泡确认框
---

# Tooltip 文字提示

文字提示，在鼠标 hover 时显示提示文字。


## 基础用法

::: preview
demo-preview=../demo/tooltip/Basic.vue
:::

## 更多内容的文字提示

展示多行文本或者设置内容的格式
通过 `content` 插槽设置内容

::: preview
demo-preview=../demo/tooltip/Slot.vue
:::

## 禁用状态

禁用状态，鼠标悬停无法触发文字提示。`disabled` 属性可以满足这个需求。

::: preview
demo-preview=../demo/tooltip/Disabled.vue
:::

## 虚拟节点

`virtualRef`：外部“参考元素”（reference element）。Tooltip 会把气泡锚定到它上面，而不是组件内部的触发器节点。可传 HTMLElement，或 Popper 的 VirtualElement（自定义 getBoundingClientRect 的对象，用于鼠标位置等非 DOM 点）。

`virtualTriggering`：是否启用“虚拟触发”模式。开启后组件不再渲染内置的触发器包裹层（.liu-tooltip__trigger），期待你用外部的 virtualRef 来当触发点和定位基准。
`manual`手动加入触发器 

::: preview
demo-preview=../demo/tooltip/Virtual.vue
:::

## Tooltip API

### Props

| Name           | Description | Type                                                     | Default |
| -------------- | ----------- | -------------------------------------------------------- | ------- |
| content        | 提示文字    | `string`                                                 | -       |
| disabled       | 是否禁用    | `boolean`                                                | false   |
| placement      | 弹出位置    | `string`                                                 | bottom  |
| trigger        | 触发方式    | `string`                                                 | hover   |
| manual         | 手动控制    | `boolean`                                                | false   |
| popper-options | popper 配置 | `object` 参考[popper.js](https://popper.js.org/docs/v2/) | {}      |
| transition     | 动画        | `string`                                                 | fade    |
| show-timeout   | 显示延时    | `number`                                                 | 0       |
| hide-timeout   | 隐藏延时    | `number`                                                 | 200     |

### Events

| Name           | Description            | Type                         |
| -------------- | ---------------------- | ---------------------------- |
| visible-change | 显示隐藏状态改变时触发 | `(visible: boolean) => void` |
| click-outside  | 点击外部时触发         | `() => void`                 |

### Slots

| Name    | Description |
| ------- | ----------- |
| default | 默认插槽    |
| content | 内容插槽    |

### Expose

| Name | Description | Type         |
| ---- | ----------- | ------------ |
| show | 显示        | `() => void` |
| hide | 隐藏        | `() => void` |
