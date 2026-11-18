import type {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import type { ImageFilePath } from "@7h3laughingman/foundry-types/common/constants.mjs";
import type { ActorAFMBE } from "..";

type ActorSheetPart = "header";

type ActorSheetRenderOptions = DocumentSheetRenderOptions;

type ActorSheetRenderContext = DocumentSheetRenderContext & {
    actor?: ActorAFMBE;
    img?: ImageFilePath;
};

type ActorSheetConfiguration = DocumentSheetConfiguration;

export type { ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext, ActorSheetRenderOptions };
