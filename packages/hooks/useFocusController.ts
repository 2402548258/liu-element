
import { getCurrentInstance, ref, type Ref } from "vue";
import useEventListener from "./useEventListener";
import { isFunction } from "lodash-es";

interface UseFocusControllerOptions {
  afterFocus?(): void;
  beforeBlur?(event: FocusEvent): void | boolean;
  afterBlur?(): void;
}

export function useFocusController<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>,
  { afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!;
  const { emit } = instance;
  const wrapperRef = ref<HTMLElement>();
  const isFocused = ref(false);
  const handleFocus = (event: FocusEvent) => { 
    if(isFocused.value) return;
    isFocused.value = true;
    emit("focus", event)
    afterFocus?.();
   };

   const handleBlur = (event: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur)? beforeBlur(event) : false;
    if(cancelBlur) return;
    isFocused.value = false;
    emit("blur", event)
    afterBlur?.();
   }
   const handleCLick = ()=>{
    target.value?.focus();
   }

   useEventListener(wrapperRef, "click", handleCLick)
     return {
       wrapperRef,
       isFocused,
       handleFocus,
       handleBlur,
     };
}

export default useFocusController;
