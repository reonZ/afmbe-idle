export * from "./base";
export * from "./creature";
export * from "./character";
export * from "./adversary";
export * from "./member";
export * from "./zombie";

import { AdversaryDataModel, AdversarySheet } from "./adversary";
import { MemberDataModel, MemberSheet } from "./member";
import { ZombieDataModel, ZombieSheet } from "./zombie";

export const ACTOR_CONFIG = [
    { type: "adversary", data: AdversaryDataModel, sheet: AdversarySheet },
    { type: "member", data: MemberDataModel, sheet: MemberSheet },
    { type: "zombie", data: ZombieDataModel, sheet: ZombieSheet },
];
