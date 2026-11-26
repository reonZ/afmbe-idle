import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE } from "..";

type ItemSheetPart = "description" | "effects" | "header";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetRenderContext = DocumentSheetRenderContext & {
    actor?: ActorAFMBE | null;
    description?: { enriched: string; value: string };
    isOwned?: boolean;
    item?: ItemAFMBE;
};

type ItemSheetLevel = {
    label: string;
    max: number | "any";
    min: number | "any";
    name: string;
    value: number;
};

type ItemSheetConfiguration = DocumentSheetConfiguration;

export type { ItemSheetConfiguration, ItemSheetLevel, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions };
