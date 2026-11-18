import {
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";

abstract class ApplicationAFMBE extends foundry.applications.api.ApplicationV2 {
    static TEMPLATE: string = "";

    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
        classes: ["afmbe"],
    };

    _renderHTML(context: ApplicationRenderContext, _options: ApplicationRenderOptions): Promise<string> {
        return foundry.applications.handlebars.renderTemplate(
            (this.constructor as typeof ApplicationAFMBE).TEMPLATE,
            context,
        );
    }

    _replaceHTML(result: string, content: HTMLElement, _options: ApplicationRenderOptions): void {
        content.innerHTML = result;
        content.dataset.tooltipDirection = "UP";
        this._activateListeners(content);
    }

    _activateListeners(html: HTMLElement): void {}
}

export { ApplicationAFMBE };
