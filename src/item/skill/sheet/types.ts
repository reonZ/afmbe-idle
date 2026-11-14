import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import type {
    ItemSheetConfiguration,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
    Skill,
} from "item";

type SkillSheetPart = ItemSheetPart | "details" | "level";

type SkillSheetRenderOptions = ItemSheetRenderOptions;

type SkillSheetConfiguration = ItemSheetConfiguration;

type SkillSheetRenderContext = ItemSheetRenderContext & {
    level?: number;
    parent?: {
        available: FormSelectOption[];
        selected: string | undefined;
    };
    specialties?: Skill[];
};

export type { SkillSheetConfiguration, SkillSheetPart, SkillSheetRenderContext, SkillSheetRenderOptions };
