import { computed, getCurrentInstance, type ComputedRef } from "vue";

export default function useProps<T>(propName:string): ComputedRef<T> { 
    const instance = getCurrentInstance()
      if (!instance) {
        throw new Error("useProp must be used within a component");
      }
      return computed(() => (instance.proxy?.$props as any)[propName] as T)
}