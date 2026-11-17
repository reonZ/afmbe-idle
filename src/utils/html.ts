import { EnrichmentOptions } from "@7h3laughingman/foundry-types/client/applications/ux/text-editor.mjs";

function enrichHTML(content: string | null, options?: EnrichmentOptions): Promise<string> {
    return foundry.applications.ux.TextEditor.implementation.enrichHTML(content, options);
}

export { enrichHTML };
