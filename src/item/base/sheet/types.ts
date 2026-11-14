import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { ActorAFMBE } from "actor";

type ItemSheetPart = "header";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetRenderContext = DocumentSheetRenderContext & {
    actor?: ActorAFMBE | null;
    isOwned?: boolean;
    name?: string;
};

type ItemSheetConfiguration = DocumentSheetConfiguration;

export type { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions };
