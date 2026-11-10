import type { ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "actor";

type CreatureSheetPart = "attributes";

type CreatureSheetRenderOptions = ActorSheetRenderOptions;

type CreatureSheetRenderContext = ActorSheetRenderContext;

type CreatureSheetConfiguration = ActorSheetConfiguration;

type CreatureSheetPartsContext = CreatureSheetRenderContext;

export type {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetPartsContext,
    CreatureSheetRenderContext,
    CreatureSheetRenderOptions,
};
