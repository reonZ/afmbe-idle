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
    parents?: SkillParentEntry[];
    specialties?: Skill[];
};

type SkillParentEntry = {
    skill: Skill;
    title: "next" | "root";
};

export type {
    SkillParentEntry,
    SkillSheetConfiguration,
    SkillSheetPart,
    SkillSheetRenderContext,
    SkillSheetRenderOptions,
};
