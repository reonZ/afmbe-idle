import { EnrichmentOptions } from "@7h3laughingman/foundry-types/client/applications/ux/text-editor.mjs";
import * as R from "remeda";

function enrichHTML(content: string | null, options?: EnrichmentOptions): Promise<string> {
    return foundry.applications.ux.TextEditor.implementation.enrichHTML(content, options);
}

function render(path: string, data?: object): Promise<string> {
    return foundry.applications.handlebars.renderTemplate(path, data);
}

function configToSelectOptions<T extends string>(config: Record<T, { label: string }>) {
    return R.pipe(
        config,
        R.entries(),
        R.map(([value, { label }]): SelectOption<T> => {
            return { value, label };
        }),
    );
}

export { configToSelectOptions, enrichHTML, render };
