import type { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from "item";

type SkillSheetPart = ItemSheetPart | "sidebar";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {
    parents?: SkillSheetParentEntry[];
    specialties?: SkillSheetSkillEntry[];
};

type SkillSheetSkillEntry = {
    id: string;
    level: number;
    name: string;
};

type SkillSheetParentEntry = SkillSheetSkillEntry & {
    title: "next" | "root";
};

export type {
    SkillSheetConfiguration,
    SkillSheetParentEntry,
    SkillSheetPart,
    SkillSheetRenderContext,
    SkillSheetRenderOptions,
    SkillSheetSkillEntry,
};
