import { withInstall } from "@liu-element/utils";
import Select from "./Select.vue";
import Option from "./Option.vue";

export const LiuSelect = withInstall(Select);
export const LiuOption = withInstall(Option);
export * from "./types";