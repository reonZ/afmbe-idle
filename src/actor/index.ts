export * from "./base";
export * from "./creature";
export * from "./adversary";
export * from "./member";
export * from "./zombie";

import { MemberDataModel, MemberSheet } from "./member";

export const ACTOR_CONFIG = [{ type: "member", data: MemberDataModel, sheet: MemberSheet }];
