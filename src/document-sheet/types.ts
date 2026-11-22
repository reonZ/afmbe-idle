import type { DocumentSheetRenderContext } from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import type {
    HandlebarsApplication,
    HandlebarsApplicationStatic,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import type { ItemAFMBE } from "item";

interface DocumentSheetAFMBE extends HandlebarsApplication {
    _attachListeners(html: HTMLElement): void | Promise<void>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

interface DocumentSheetStaticAFMBE extends ConstructorOf<DocumentSheetAFMBE>, HandlebarsApplicationStatic {
    PARTS: DocumentSheetPartAFME<string, DocumentSheetRenderContext>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

type DocumentSheetPartAFME<TPart extends string, TContext extends DocumentSheetRenderContext> = Record<
    TPart,
    HandlebarsTemplatePart & {
        activateListeners?: (html: HTMLElement, options: HandlebarsRenderOptions) => void | Promise<void>;
        prepareContext?: (context: TContext, options: HandlebarsRenderOptions) => Promise<void> | void;
    }
>;

export type { DocumentSheetAFMBE, DocumentSheetPartAFME, DocumentSheetStaticAFMBE };
