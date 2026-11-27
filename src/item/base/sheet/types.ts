import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE } from "..";

type ItemSheetPart = "description" | "effects" | "header" | "tabs";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetEffect = {
    id: string;
    index: number;
    options: Record<string, any>;
    rootId: string;
    rootName: string;
    template: string;
    title: string;
    value: JSONValue;
};

type ItemSheetRenderContext = DocumentSheetRenderContext & {
    actor?: ActorAFMBE | null;
    description?: { enriched: string; value: string };
    effects?: ItemSheetEffect[];
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

export type {
    ItemSheetConfiguration,
    ItemSheetEffect,
    ItemSheetLevel,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
};
