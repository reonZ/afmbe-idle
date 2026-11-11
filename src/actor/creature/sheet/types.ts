import type {
    ActorSheetConfiguration,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttribute,
    CreatureSecondaryAttribute,
    CreatureSpeed,
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

type RollTaskTargetData = {
    attribute?: CreatureAttribute;
    hideAttributes?: `${boolean}`;
};

export type {
    CreatureAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
    RollTaskTargetData,
};
