import type { App, Plugin } from "vue";
// import { INSTALLED_KEY } from "@liu-element/constants";
import { each, get, set } from "lodash-es";
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from "@liu-element/components";

export default function makeInstaller(components: Plugin[]) {
  const install = (app: App, options?: ConfigProviderProps) => {
    // if (get(app, INSTALLED_KEY)) return;
    // set(app, INSTALLED_KEY, true);

    each(components, (c) => {
      app.use(c);
    });

    if (options) provideGlobalConfig(options, app, true);
  };

  return install;
}
