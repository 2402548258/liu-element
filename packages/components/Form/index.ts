import  { withInstall } from "@liu-element/utils";
import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

export const LiuForm = withInstall(Form);
export const LiuFormItem = withInstall(FormItem);
export * from "./types";
export * from "./hooks";