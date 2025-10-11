import { isString } from "lodash-es";

class LiuUiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LiuUiError";
  }
}

export function throwError(scope: string, message: string) {
  throw new LiuUiError(`[${scope}] ${message}`);
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string): void
export function debugWarn(scope: string,msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
    if (process.env.NODE_ENV !== "production") {
        if (isString(scope)) {
            console.warn(new LiuUiError(`[${scope}]: ${msg}`));
        } else {
            console.warn(scope);
        }
    }
}
