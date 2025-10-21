import Notification from "./methods";
import { withInstallFunction } from "@liu-element/utils";

export const LiuNotification = withInstallFunction(Notification, "$notify");

export * from "./types";
