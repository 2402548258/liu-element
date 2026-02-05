import {
  computed,
  inject,
  unref,
  ref,
  type MaybeRef,
  type WatchStopHandle,
  onMounted,
  watch,
  toRef,
  onUnmounted,
} from "vue";
import type { FormContext, FormItemContext } from "./types";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import { useProps, useId } from "@liu-element/hooks";


export const useFormItem = () => {
  const form = inject<FormContext>(FORM_CTX_KEY);
  const formItem = inject<FormItemContext>(FORM_ITEM_CTX_KEY);
  return { form, formItem };
};

export function useFormDisabled(fallback?: MaybeRef<boolean>) {
  const disabled = useProps<boolean>("disabled");
  const form = inject<FormContext>(FORM_CTX_KEY);
  const formItem = inject<FormItemContext>(FORM_ITEM_CTX_KEY);
  return computed(
    () =>
      !!(
        disabled.value ||
        form?.disabled ||
        formItem?.disabled ||
        unref(fallback)
      )
  );
}

interface UseFormItemInputCommonProps extends Record<string, any> {
  id?: string;
}

// export function useFormItemInputId(
//   props: UseFormItemInputCommonProps,
//   formItemContext?: FormItemContext
// ) {
//     const inputId = ref<string>('')
//     let unwatch: WatchStopHandle | void
//     onMounted(() => {
//         unwatch = watch(
//             () => props.id,
//             (id) => {
//                 const newId = id || useId().value
//                 if(inputId.value === newId){
//                     formItemContext?.addInputId(newId)
//                     formItemContext?.removeInputId(inputId.value)
//                     inputId.value = newId
//                 }  
//             },
//             { immediate: true }
//         )
//     });

//     onUnmounted(() => {
//         unwatch?.()
//         inputId.value && formItemContext?.removeInputId(inputId.value)
//     });

//     return { inputId }
// }

export function useFormItemInputId(
  props: UseFormItemInputCommonProps,
  formItemContext?: FormItemContext
) {
  const inputId = ref<string>("");
  let unwatch: WatchStopHandle | void;

  onMounted(() => {
    unwatch = watch(
      toRef(() => props.id),
      (id) => {
        const newId = id ?? useId().value;
        if (newId !== inputId.value) {
          inputId.value && formItemContext?.removeInputId(inputId.value);
          formItemContext?.addInputId(newId);
          inputId.value = newId;
        }
      },
      { immediate: true }
    );
  });

  onUnmounted(() => {
    unwatch && unwatch();
    inputId.value && formItemContext?.removeInputId(inputId.value);
  });

  return {
    inputId,
  };

}
