
<script setup lang="ts">
import { provide, reactive, toRefs } from "vue";
import type {
    FormProps,
    FormEmits,
    FormItemContext,
    FormContext,
    FormInstance,
    FormValidateCallback,
} from "./types";
import type { ValidateFieldsError } from "async-validator";
import { FORM_CTX_KEY } from "./constants";
import { each, filter, includes, size } from "lodash-es";

defineOptions({ name: "LiuForm" });
const props = withDefaults(defineProps<FormProps>(), {
    showMessage: true,
    hideRequiredAsterisk: false,
    requiredAsteriskPosition: "left",
    labelPosition: "right",
});
const emits = defineEmits<FormEmits>();
const fields : FormItemContext[] = []


const addField: FormContext["addField"] = (field) => {
if(!field?.prop) return
fields.push(field)
}
const removeField: FormContext["removeField"] = (field) => {
if(!field?.prop) return
fields.splice(fields.indexOf(field),1)
}

const validateField: FormInstance["validateField"] = async (keys,callback) => { 
  const filterArr = filterFields(keys??[])
  try {
     const result = await doValidate(filterArr)
     if(result){
        callback?.(true)
     }
     return result

  } catch (error) {
    if(error instanceof Error) throw error
    const invalidFields = error as ValidateFieldsError
    callback?.(false,invalidFields)
    return Promise.reject(invalidFields)
  }

}

const resetFields: FormInstance["resetFields"]=function(keys) { 
    each(filterFields(keys??[]), (field) => field.resetField() )
}

const clearValidate: FormInstance["clearValidate"]=function(keys) { 
    each(filterFields(keys??[]), (field) => field.clearValidate() )
}
const doValidate = async function(fields:FormItemContext[] = []){
    let validationErrors:ValidateFieldsError ={}
    for (const field of fields) { 
        try {
            await field.validate("")
            // const result = await field.validate("")
            // // 如果返回的不是 true，也视为失败（例如某些实现返回 false 表示未通过）
            // if (result !== true) {
            //     validationErrors = {
            //         ...validationErrors,
            //         [field.prop as string]: [{ message: "validate failed" } as any],
            //     }
            // }
        } catch (error) {
            validationErrors = {
                ...validationErrors,
                ...error as ValidateFieldsError
            }
        }
    }
    if (!size(Object.keys(validationErrors))) return true
    return Promise.reject(validationErrors)
}

const validate: FormInstance["validate"] = async function (callback?: FormValidateCallback) {
        return validateField([],callback)
}

const filterFields = (keys: string[]) => {
    return size(keys) ?
    filter(fields, (field) => includes(keys, field.prop)) : fields
}

const formCtx: FormContext = reactive({
    ...toRefs(props),
    emits,
    addField,
    removeField,
})


provide<FormContext>(FORM_CTX_KEY, formCtx)


defineExpose<FormInstance>({
    validate,
    validateField,
    resetFields,
    clearValidate,
})
</script>

<template>
    <form class="liu-form">
        <slot></slot>
    </form>
</template>

s