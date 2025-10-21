import { computed, ref } from "vue";

const zIndex =ref(0);
export function useZIndex(initValue=2000) { 
    const _initialValue = ref(initValue);
    const currentZindex = computed(() => _initialValue.value + zIndex.value);
    const nextZIndex = () => {
      zIndex.value++;
      return currentZindex.value;
    };
      return {
        initialValue: _initialValue,
        currentZindex,
        nextZIndex,
      };
}


