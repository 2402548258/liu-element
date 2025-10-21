import { withInstallFunction } from "@liu-element/utils";
import Message from "./methods";

export const LiuMessage = withInstallFunction(Message, "$message");
export * from "./type";
