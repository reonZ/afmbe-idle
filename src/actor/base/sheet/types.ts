import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { ApplicationRenderContextAFMBE } from "handlebars-application";
import type { ActorAFMBE } from "..";

type ActorSheetPart = "header";

type ActorSheetRenderOptions = DocumentSheetRenderOptions;

type ActorSheetRenderContext = ApplicationRenderContextAFMBE & {
    actor?: ActorAFMBE;
};

type ActorSheetConfiguration = DocumentSheetConfiguration;

export type { ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext, ActorSheetRenderOptions };
