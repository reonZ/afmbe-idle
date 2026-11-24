import type {
    ItemSheetConfiguration,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
    Skill,
} from "item";

type SkillSheetPart = ItemSheetPart | "sidebar";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {
    level?: number;
    parent?: Skill | null;
    specialties?: Skill[];
};

export type { SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions };
