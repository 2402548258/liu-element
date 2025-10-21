import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@liu-element/utils";

export const LiuConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'