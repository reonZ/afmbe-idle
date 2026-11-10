import type {
    ActorSheetConfiguration,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
    CreatureAttribute,
} from "actor";

type CreatureSheetPart = "attributes";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetRenderContext = ActorSheetRenderContext & {
    attributes?: CreatureSheetAttributesContext;
};

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetAttributesContext = {
    primary: { key: CreatureAttribute; label: string; value: number };
    secondary: { key: string; label: string; value: number };
};

type CreatureSheetPartsContext = CreatureSheetAttributesContext;

export type {
    CreatureSheetAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetPartsContext,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
};
