import { computed, type Ref } from "vue";

interface useOffsetOptions {
  // id: string;
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset: () => number;
}

interface useOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}

export function useOffset(options: useOffsetOptions): useOffsetResult { 
    const lastBottomOffset = computed(() => options.getLastBottomOffset())
    const topOffset = computed(() => options.offset + lastBottomOffset.value)
    const bottomOffset = computed(
      () => options.boxHeight.value + topOffset.value
    );
    return { topOffset, bottomOffset };
}

export default useOffset

