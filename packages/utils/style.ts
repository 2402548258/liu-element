import { isNumber, isString } from "lodash-es";
import { debugWarn } from "./error";
import { unref, type MaybeRef, type Ref } from "vue";

const SCOPE = "utils/style" as const;
const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
export function addUnit(value?: string | number, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  }
  if (isString(value)) {
    return value;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}

// const isStringNumber = (val: MaybeRef<string>): boolean => {
//   if (!isString(unref(val))) {
//     return false;
//   }
//   return !Number.isNaN(Number(val));
// };
// export function addUnit(
//   value?: MaybeRef<string> | MaybeRef<number>,
//   defaultUnit = "px"
// ) {
//   if (!unref(value)) return "";
//   if (
//     isNumber(unref(value)) ||
//     isStringNumber(unref(value) as MaybeRef<string>)
//   ) {
//     return `${unref(value)}${defaultUnit}`;
//   }
//   if (isString(unref(value))) {
//     return unref(value);
//   }
//   debugWarn(SCOPE, "binding value must be a string or number");
// }
