import type {
    ActorSheetConfiguration,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttribute,
    CreatureSecondaryAttribute,
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
        max: number;
    }[];
    speed: {
        value: number;
        half: number;
    };
};

export type {
    CreatureAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
};
