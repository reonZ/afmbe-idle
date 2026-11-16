import type {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
} from "actor";
import type { Skill } from "item";

type CharacterSheetPart = CreatureSheetPart | "skills";

type CharacterSheetRenderOptions = CreatureSheetRenderOptions;

type CharacterSheetConfiguration = CreatureSheetConfiguration;

type CharacterSheetRenderContext = CreatureSheetRenderContext & {
    skills?: Skill[];
};

export type {
    CharacterSheetConfiguration,
    CharacterSheetPart,
    CharacterSheetRenderContext,
    CharacterSheetRenderOptions,
};
