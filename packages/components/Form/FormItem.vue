<script setup lang="ts">
import {
    computed,
    provide,
    inject,
    onMounted,
    onUnmounted,
    ref,
    nextTick,
    watch,
    reactive,
    watchEffect,
    toRefs,
    useSlots,
} from "vue";
import Schema, { type RuleItem } from "async-validator";
import type {
    FormItemContext,
    FormItemProps,
    FormValidateFailuer,
    FormValidateCallback,
    ValidateStatus,
    FormItemInstance,
    FormItemRule,
    FormContext,
} from "./types";
import {
    isNil,
    get,
    size,
    filter,
    some,
    isString,
    isNumber,
    endsWith,
    keys,
    includes,
    map,
    cloneDeep,
    isArray,
    each,
} from "lodash-es";
import { useId } from "@liu-element/hooks";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import { addUnit } from "@liu-element/utils";

defineOptions({ name: "LiuFormItem" });
const props = withDefaults(defineProps<FormItemProps>(), {
    showMessage: true,
    required: void 0,
});
const slots = useSlots();
const ctx = inject<FormContext>(FORM_CTX_KEY);
const normalizeLabelWidth = computed(() => {
    if (props.labelWidth) {
        return addUnit(props.labelWidth)}
    if (ctx?.labelWidth) {
        console.log(addUnit(ctx.labelWidth));
        return addUnit(ctx.labelWidth)}
    return '150px'
})
const validateStatus = ref<ValidateStatus>("init");
const errMsg = ref("");
const inputId = ref<string[]>([])
const labelId = useId().value
const innerVal = computed(() => {
    const model = ctx?.model
    return getValByProp(model)
})

const propString = computed(() => {
    if (!props.prop) return ''
    return isString(props.prop) ? props.prop : props.prop.join('.')
})

const itemRules = computed(() => {
    const { required } = props
    const rules: FormItemRule[] = []
    if (props.rules) {
        rules.push(...props.rules)
    }
    const formRules = ctx?.rules
    if (formRules && props.prop) {
        const formRule = getValByProp(formRules)
        if(formRule) rules.push(...formRule)
    }
    if (!isNil(required)) {
        const requiredRules = filter(map(rules, (rule, i) => [rule, i]),
            (item: [FormItemRule, number]) => includes(keys(item[0]), "required")
        )
        if (size(requiredRules) > 0) {
            each(requiredRules, (item) => {
                const [rule, i] = item as [FormItemRule, number];
                if (rule.required !== required) {
                    rules[i] = { ...rule, required }
                }
            })
        } else {
            rules.push({ required })

        }

    }
    return rules
})

const isRequired = computed(() => {
    return !(ctx?.hideRequiredAsterisk) && some(itemRules.value, "required")
        || props.required
})

const isDisabled = computed(() => props.disabled || ctx?.disabled)

const hasLabel = computed(() => !!(props.label || slots.label))

const labelFor = computed(() => props.for || (inputId.value.length ? inputId.value[0] : ''))

const currentLabel = computed(() => {
    return `${props.label || ''}${ctx?.labelSuffix || ''}`
})

let initialValue: any = null
let isResetting = false
function getValByProp(target: Record<string, any> | void) {
    if (props.prop && !isNil(get(target, props.prop))) {
        return get(target, props.prop)
    }
    return null
}

const validate: FormItemInstance["validate"] = async function (
    trigger: string, callback?: FormValidateCallback) {
    if (isResetting || !props.prop || isDisabled.value) return false
    const rules = getTriggeredRules(trigger)
    if (!size(rules)) {
        callback?.(false)
        return false
    }
    validateStatus.value = "validating"
    return doValidate(rules).then(
        () => {
            callback?.(true)
            return true
        }
    ).catch((err) => {
        const { fields } = err
        callback?.(false, fields)
        return Promise.reject(fields)
        // callback?.(false, err as any)
        // return Promise.reject(err)
    })
}

const clearValidate: FormItemInstance['clearValidate'] = function () {
    validateStatus.value = "init"
    errMsg.value = ""
    isResetting = false
}

const addInputId: FormItemContext['addInputId'] = function (id) {
    if (!includes(inputId.value, id)) inputId.value.push(id)
}

const removeInputId: FormItemContext['removeInputId'] = function (id) {
    inputId.value = inputId.value.filter(item => item !== id)
}

const resetField: FormItemInstance['resetField'] = function () {
    const model = ctx?.model
    if (model && propString.value && !isNil(get(model, propString.value))) {
        isResetting = true
        model[propString.value] = cloneDeep(initialValue)
    }
    nextTick(() => clearValidate())

}
function getTriggeredRules(trigger: string) {
    const rules = itemRules.value
    if (rules) {
        return filter(rules, (rule) => {
            if (!trigger || !rule.trigger) return true
            if (isArray(rule.trigger)) {
                return rule.trigger.includes(trigger)
            }
            return rule.trigger === trigger
        }).map(({ trigger, ...rule }) => rule as RuleItem)
    }
    return []
}

async function doValidate(rules: any[]) {
    const modalName = propString.value
    const validator = new Schema({ [modalName]: rules })
    return validator.validate({ [modalName]: innerVal.value }, { firstFields: true }).then(() => {
        validateStatus.value = 'success'
        ctx?.emits('validate', props, true, '')
        return true
    }).catch((err: FormValidateFailuer) => {
        const { errors } = err
        validateStatus.value = 'error'
        errMsg.value = errors && size(errors) > 0 ? errors[0].message ?? '' : ''
        ctx?.emits('validate', props, false, errMsg.value)
        return Promise.reject(err);
    })
}


const formItemCtx: FormItemContext = reactive({
    ...toRefs(props),
    disabled: isDisabled.value,
    validate,
    resetField,
    clearValidate,
    addInputId,
    removeInputId,

})

provide(FORM_ITEM_CTX_KEY, formItemCtx)

defineExpose<FormItemInstance>({
    validateStatus,
    validateMessage: errMsg,
    validate,
    resetField,
    clearValidate
})
onMounted(() => {
    if (!props.prop) return
    initialValue = innerVal.value
    ctx?.addField(formItemCtx)
})

onUnmounted(() => {
    if (!props.prop) return
    ctx?.removeField(formItemCtx)
})

watchEffect(() => (formItemCtx.disabled = isDisabled.value));

watch(
    () => props.error,
    (val) => {
        errMsg.value = val || "";
        validateStatus.value = val ? "error" : "init";
    },
    { immediate: true }
);

</script>

<template>
    <div class="liu-form-item" :class="{
        'is-error': validateStatus === 'error',
        'is-disabled': isDisabled,
        'is-required': isRequired,
        'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
        'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
    }">
        <component v-if="hasLabel" class="liu-form-item__label" :class="`position-${ctx?.labelPosition ?? 'right'}`"
            :is="labelFor ? 'label' : 'div'" :id="labelId" :for="labelFor">
            <slot name="label" :label="currentLabel">
                {{ currentLabel }}
            </slot>
        </component>
        <div class="liu-form-item__content">
            <slot :validate="validate"></slot>
            <div class="liu-form-item__error-msg" v-if="validateStatus === 'error'">
                <template v-if="ctx?.showMessage && showMessage">
                    <slot name="error" :error="errMsg">{{ errMsg }}</slot>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./style.css";

.liu-form-item {
    --liu-form-label-width: v-bind(normalizeLabelWidth) !important;
}
</style>