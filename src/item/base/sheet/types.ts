import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import type { ImageFilePath } from "@7h3laughingman/foundry-types/common/constants.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE } from "..";

type ItemSheetPart = "header" | "description";

type ItemSheetRenderOptions = DocumentSheetRenderOptions;

type ItemSheetRenderContext = DocumentSheetRenderContext & {
    actor?: ActorAFMBE | null;
    description?: { enriched: string; value: string };
    isOwned?: boolean;
    img?: ImageFilePath;
    item?: ItemAFMBE;
    level?: ItemSheetLevel;
    name?: string;
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
