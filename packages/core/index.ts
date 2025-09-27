import { makeInstaller } from "@liu-element/utils";
import components from "./components";
import '@liu-element/theme/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons"


library.add(fas)
 const install = makeInstaller(components)
 export * from "../components"
 export default install