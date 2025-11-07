import type { App } from "vue";
import { Loading } from "./service";
import { vLoading } from "./directive";
export const LiuLoading = {
  name: "LiuLoading",
  install(app: App) {
    app.directive("loading",vLoading)
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading
};
export {
  vLoading,
  vLoading as LiuLoadingDirective,
  Loading as LiuLoadingService,
};

export * from "./types"


