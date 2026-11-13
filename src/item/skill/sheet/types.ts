import type { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from "item";

type SkillSheetPart = ItemSheetPart | "details" | "level";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {};

export type { SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions };
