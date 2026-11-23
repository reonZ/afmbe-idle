import type {
    ActorSheetConfiguration,
    ActorSheetPart,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttributeType,
    CreatureSecondaryType,
    CreatureSpeed,
} from "actor";
import { TaskApplicationSelected } from "application";

type CreatureSheetPart = ActorSheetPart | "attributes";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetRenderContext = ActorSheetRenderContext & {
    primary?: {
        key: CreatureAttributeType;
        label: string;
        value: number;
    }[];
    secondary?: {
        key: CreatureSecondaryType;
        label: string;
        value: number;
        max: number | null;
    }[];
    speed?: CreatureSpeed;
    name?: string;
};

type RollTaskTargetData = Partial<TaskApplicationSelected> & {
    disable?: string;
};

export type {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
    RollTaskTargetData,
};
