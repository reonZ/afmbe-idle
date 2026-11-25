import {
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import * as R from "remeda";
import { logObject, render } from "utils";
import { ApplicationConfigurationAFMBE } from ".";

abstract class ApplicationAFMBE<
    TConfig extends ApplicationConfigurationAFMBE = ApplicationConfigurationAFMBE,
> extends foundry.applications.api.ApplicationV2<TConfig> {
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
        classes: ["afmbe"],
        actions: {
            "log-instance": this.#logInstance,
        },
        window: {
            controls: [
                {
                    action: "log-instance",
                    icon: "fa-solid fa-terminal",
                    label: "afmbe.application.controls.log-instance",
                },
            ],
        },
    };

    static async #logInstance(this: ApplicationAFMBE) {
        const name = R.uncapitalize(this.constructor.name);
        logObject(name, this);
    }

    abstract get template(): string;

    _renderHTML(context: ApplicationRenderContext, _options: ApplicationRenderOptions): Promise<string> {
        return render(this.template, context);
    }

    _replaceHTML(result: string, content: HTMLElement, _options: ApplicationRenderOptions): void {
        const scrollPositions: [string, number, number][] = [];

        for (const selector of this.options.scrollable || []) {
            const el = selector === "" ? content : content.querySelector(selector);
            if (!el) continue;
            scrollPositions.push([selector, el.scrollTop, el.scrollLeft]);
        }

        content.innerHTML = result;
        content.dataset.tooltipClass = "afmbe";
        content.dataset.tooltipDirection = "UP";

        for (const [selector, scrollTop, scrollLeft] of scrollPositions) {
            const el = selector === "" ? content : content.querySelector(selector);
            if (el) Object.assign(el, { scrollTop, scrollLeft });
        }

        this._activateListeners(content);
    }

    _activateListeners(html: HTMLElement): void {}
}

export { ApplicationAFMBE };
