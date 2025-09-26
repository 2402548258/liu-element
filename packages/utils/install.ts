import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c);
    });

  return install;
}

export const withInstall = <T>(component: T) => {
  if (!component) {
    // 在测试里看它到底从哪里被导入的
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error("[withInstall] got", component);
    throw new TypeError("[withInstall] component is undefined");
  }
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || "UnnamedComponent";
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
};