import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { ActorAFMBE } from "actor";
import { ApplicationRenderContextAFMBE } from "handlebars-application";
import { ItemAFMBE } from "..";

type ItemSheetPart = "header" | "description";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetRenderContext = ApplicationRenderContextAFMBE & {
    actor?: ActorAFMBE | null;
    description?: { enriched: string; value: string };
    isOwned?: boolean;
    item?: ItemAFMBE;
    name?: string;
};

type ItemSheetConfiguration = DocumentSheetConfiguration;

export type { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions };
