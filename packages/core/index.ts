import { makeInstaller } from "@liu-element/utils";
import components from "./components";
import '@liu-element/theme/index.css'
// import "@liu-element/theme";
 const install = makeInstaller(components)
 export * from "@liu-element/components"
 export default install
 