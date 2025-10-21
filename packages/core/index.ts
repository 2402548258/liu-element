import makeInstaller from "./makeInstaller";
import components from "./components";
import '@liu-element/theme/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons"
import pringLogo from "./pringLogo";



const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
(globalThis as any)["@DEV"] = isDev;
(globalThis as any)["@PROD"] = isProd;
(globalThis as any)["@TEST"] = isTest;
 pringLogo()
 library.add(fas)
 const install = makeInstaller(components)
 export * from "@liu-element/components"
 export * from "@liu-element/locale"
 export default install