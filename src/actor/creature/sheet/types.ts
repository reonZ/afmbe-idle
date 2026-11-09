import type { ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "actor";

type CreatureSheetPart = "attributes";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetRenderContext = ActorSheetRenderContext;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetAttributesContext = {};

type CreatureSheetPartsContext = CreatureSheetAttributesContext;

export type {
    CreatureSheetAttributesContext,
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetPartsContext,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
};
