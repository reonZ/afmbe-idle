import { ImageFilePath } from "@7h3laughingman/foundry-types/common/constants.mjs";
import type {
    ActorSheetConfiguration,
    ActorSheetPart,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttributeType,
    CreatureSecondaryType,
    CreatureSpeed,
} from "actor";
import type { TaskApplicationSelected } from "application";

type CreatureSheetPart = ActorSheetPart | "attributes" | "qualities";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetQuality = {
    id: string;
    level: ValueAndMax;
    name: string;
};

type CreatureSheetRenderContext = ActorSheetRenderContext & {
    drawbacks?: CreatureSheetQuality[];
    img?: ImageFilePath;
    primary?: {
        key: CreatureAttributeType;
        label: string;
        value: number;
    }[];
    qualities?: CreatureSheetQuality[];
    secondary?: {
        key: CreatureSecondaryType;
        label: string;
        value: number;
        max: number | null;
    }[];
    speed?: CreatureSpeed;
};

type RollTaskTargetData = Partial<TaskApplicationSelected> & {
    disable?: string;
};

export type {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetQuality,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
    RollTaskTargetData,
};
