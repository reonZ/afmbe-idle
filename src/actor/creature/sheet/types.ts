import type {
    ActorSheetConfiguration,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttribute,
    CreatureSecondaryAttribute,
    CreatureSpeed,
    RollTaskSelected,
} from "actor";

type CreatureSheetPart = "attributes";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetRenderContext = ActorSheetRenderContext & {
    attributes?: CreatureAttributesContext;
};

type CreatureAttributesContext = {
    primary: {
        key: CreatureAttribute;
        label: string;
        value: number;
    }[];
    secondary: {
        key: CreatureSecondaryAttribute;
        label: string;
        value: number;
        max: number | null;
    }[];
    speed: CreatureSpeed;
};

type RollTaskTargetData = RollTaskSelected & {
    disable?: string;
    hide?: string;
};

export type {
    CreatureAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
    RollTaskTargetData,
};
