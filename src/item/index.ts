export * from "./base";
export * from "./physical";
export * from "./armor";
export * from "./quality";
export * from "./skill";
export * from "./weapon";

import { QualityDataModel, QualitySheet } from "./quality";
import { SkillDataModel, SkillSheet } from "./skill";

export const ITEM_CONFIG = [
    { type: "quality", data: QualityDataModel, sheet: QualitySheet },
    { type: "skill", data: SkillDataModel, sheet: SkillSheet },
];
