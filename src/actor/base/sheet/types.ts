import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";

type ActorSheetPart = "header";

type ActorSheetRenderOptions = DocumentSheetRenderOptions;

type ActorSheetRenderContext = DocumentSheetRenderContext & {
    name?: string;
};

type ActorSheetConfiguration = DocumentSheetConfiguration;

type ActorParts<P extends ActorSheetPart | ({} & string), T extends ActorSheetRenderContext> = Record<
    P,
    HandlebarsTemplatePart & { prepareContext: <C extends T>(context: C) => Promise<C> | C }
>;

export type { ActorParts, ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext, ActorSheetRenderOptions };
