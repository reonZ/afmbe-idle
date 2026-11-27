import type { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from "item";

type SkillSheetPart = ItemSheetPart | "sidebar";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {
    parent?: SkillSheetSkillEntry;
    specialties?: SkillSheetSkillEntry[];
};

type SkillSheetSkillEntry = {
    id: string;
    level: number;
    name: string;
};

export type {
    SkillSheetConfiguration,
    SkillSheetPart,
    SkillSheetRenderContext,
    SkillSheetRenderOptions,
    SkillSheetSkillEntry,
};
