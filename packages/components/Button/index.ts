import { withInstall } from "@liu-element/utils";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";

export const LiuButton = withInstall(Button);
export const LiuButtonGroup = withInstall(ButtonGroup);
export * from "./types"