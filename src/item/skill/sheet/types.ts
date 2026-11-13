import type {
    ItemSheetConfiguration,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
    Specialty,
} from "item";

type SkillSheetPart = ItemSheetPart | "details" | "level";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {
    level?: number;
    specialties: Specialty[];
};

export type { SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions };
