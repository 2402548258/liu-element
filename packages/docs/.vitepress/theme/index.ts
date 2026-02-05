import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import LiuElement,{zhCn} from "@xiaoyue789/liu-element";
import { ElementPlusContainer } from "@vitepress-preview/component";
import "@vitepress-preview/component/style.css";
import "@xiaoyue789/liu-element/css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(LiuElement, { locale: zhCn });
  },
};
