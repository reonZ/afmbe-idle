export * from "./base";
export * from "./physical";
export * from "./armor";
export * from "./effect";
export * from "./quality";
export * from "./skill";
export * from "./weapon";

import { QualityDataModel, QualitySheetAFMBE } from "./quality";
import { SkillDataModel, SkillSheetAFMBE } from "./skill";

export const ITEM_CONFIG = [
    { type: "quality", data: QualityDataModel, sheet: QualitySheetAFMBE },
    { type: "skill", data: SkillDataModel, sheet: SkillSheetAFMBE },
];
