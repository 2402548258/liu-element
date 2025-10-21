import {
  onMounted,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  type MaybeRef,
} from "vue";


//useEventListener 是一个通用的 Vue 3 事件监听 hook。它可以：

// 自动在组件挂载时注册事件；

// 在组件卸载时自动移除事件；

// 如果监听目标是一个 ref（可能动态变化），会自动 watch 并更新监听对象。
export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => target?.addEventListener(event, handler));
  }

  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
