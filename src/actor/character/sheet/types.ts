import type {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
} from "actor";

type CharacterSheetPart = CreatureSheetPart | "skills";

type CharacterSheetRenderOptions = CreatureSheetRenderOptions;

type CharacterSheetConfiguration = CreatureSheetConfiguration;

type CharacterSheetRenderContext = CreatureSheetRenderContext & {
    skills?: CharacterSheetSkill[];
};

type CharacterSheetSkill = {
    id: string;
    modifier: string;
    name: string;
    specialty: boolean;
};

export type {
    CharacterSheetConfiguration,
    CharacterSheetPart,
    CharacterSheetRenderContext,
    CharacterSheetRenderOptions,
    CharacterSheetSkill,
};
