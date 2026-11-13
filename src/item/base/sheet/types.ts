import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";

type ItemSheetPart = "header";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetRenderContext = DocumentSheetRenderContext & {
    name?: string;
};

type ItemSheetConfiguration = DocumentSheetConfiguration;

type ItemParts<P extends ItemSheetPart | ({} & string), T extends ItemSheetRenderContext> = Record<
    P,
    HandlebarsTemplatePart & { prepareContext: <C extends T>(context: C) => Promise<C> | C }
>;

export type { ItemParts, ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions };
