import type { InjectionKey } from "vue";
import type { SelectContext } from "./types";

export const SELECT_CTX_KEY: InjectionKey<SelectContext> =
  Symbol("selectContext");
