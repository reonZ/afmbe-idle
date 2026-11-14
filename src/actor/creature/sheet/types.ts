import type {
    ActorSheetConfiguration,
    ActorSheetPart,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttributeType,
    CreatureSecondaryType,
    CreatureSpeed,
    RollTaskSelected,
} from "actor";
import type { Skill } from "item";

type CreatureSheetPart = ActorSheetPart | "attributes" | "skills";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetRenderContext = ActorSheetRenderContext & {
    attributes?: CreatureAttributesContext;
    skills?: Skill[];
};

type CreatureAttributesContext = {
    primary: {
        key: CreatureAttributeType;
        label: string;
        value: number;
    }[];
    secondary: {
        key: CreatureSecondaryType;
        label: string;
        value: number;
        max: number | null;
    }[];
    speed: CreatureSpeed;
};

type RollTaskTargetData = RollTaskSelected & {
    disable?: string;
    hide?: string;
    tooltip: string;
};

export type {
    CreatureAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
    RollTaskTargetData,
};
