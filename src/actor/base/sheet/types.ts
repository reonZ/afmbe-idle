import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";

type ActorSheetPart = "header";

type ActorSheetRenderOptions = DocumentSheetRenderOptions;

type ActorSheetRenderContext = DocumentSheetRenderContext & {
    name?: string;
};

type ActorSheetConfiguration = DocumentSheetConfiguration;

export type { ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext, ActorSheetRenderOptions };
