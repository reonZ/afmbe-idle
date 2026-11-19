export * from "./base";
export * from "./task";

import { TaskMessageDataModel } from "./task";

export const CHAT_MESSAGE_CONFIG = [{ type: "task", data: TaskMessageDataModel }];
