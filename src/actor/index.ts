export * from "./base";
export * from "./creature";
export * from "./character";
export * from "./adversary";
export * from "./member";
export * from "./zombie";

import { AdversaryDataModel, AdversarySheetAFMBE } from "./adversary";
import { MemberDataModel, MemberSheetAFMBE } from "./member";
import { ZombieDataModel, ZombieSheetAFMBE } from "./zombie";

export const ACTOR_CONFIG = [
    { type: "adversary", data: AdversaryDataModel, sheet: AdversarySheetAFMBE },
    { type: "member", data: MemberDataModel, sheet: MemberSheetAFMBE },
    { type: "zombie", data: ZombieDataModel, sheet: ZombieSheetAFMBE },
];
