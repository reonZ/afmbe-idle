export * from "./base";
export * from "./physical";
export * from "./armor";
export * from "./quality";
export * from "./skill";
export * from "./weapon";

import { SkillDataModel, SkillSheet } from "./skill";

export const ITEM_CONFIG = [{ type: "skill", data: SkillDataModel, sheet: SkillSheet }];
