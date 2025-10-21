import { prefix } from "@fortawesome/free-solid-svg-icons";
import { computed, type Ref } from "vue";

const defaultIdInjection = {
    prefix:Math.floor(Math.random()*1000),
    current:0,
}
export function useId(namespace: string = "liu"): Ref<string> {
  const idRef = computed(
    () =>
      `${namespace}-id-${
        defaultIdInjection.prefix
      }-${defaultIdInjection.current++}`
  );

  return idRef;
}
export default useId