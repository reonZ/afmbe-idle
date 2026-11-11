import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import * as R from "remeda";
import { localize } from "utils";
import {
    Creature,
    CREATURE_ATTRIBUTES,
    CreatureAttributesModule,
    RollTaskRenderContext,
    RollTaskSelect,
    RollTaskTargetData,
} from "..";

class RollTaskApplication extends foundry.applications.api.ApplicationV2 {
    #actor: Creature;
    #data: RollTaskTargetData;
    #event: PointerEvent | undefined;
    #selected: Record<string, string | undefined> = {};

    constructor(
        actor: Creature,
        data: RollTaskTargetData,
        event?: PointerEvent,
        options?: DeepPartial<ApplicationConfiguration>,
    ) {
        super(options);
        this.#actor = actor;
        this.#data = data;
        this.#event = event;
    }

    static roll(actor: Creature, data: RollTaskTargetData, event?: PointerEvent): RollTaskApplication {
        const app = new this(actor, data, event);
        app.render(true);
        return app;
    }

    get actor(): Creature {
        return this.#actor;
    }

    get title(): string {
        return localize("actor.creature.task.title", this.actor);
    }

    async _prepareContext(): Promise<RollTaskRenderContext> {
        const { attribute, hideAttributes } = this.#data;

        const categories: RollTaskSelect[] = [
            {
                hide: hideAttributes === "true",
                key: "attribute",
                label: localize("actor.creature.task.attribute"),
                options: R.map(CREATURE_ATTRIBUTES, (value) => {
                    const label = CreatureAttributesModule.getLabel(value);
                    return { label, value };
                }),
                selected: (this.#selected.attribute ??= attribute),
            },
        ];

        return {
            categories,
            private: !!this.#event?.ctrlKey,
        };
    }

    async _onFirstRender(context: object, options: ApplicationRenderOptions): Promise<void> {
        super._onFirstRender(context, options);
        this.actor.apps[this.id] = this;
    }

    protected _onClose(options: ApplicationClosingOptions): void {
        super._onClose(options);
        delete this.actor.apps[this.id];
    }

    protected _renderHTML(context: ApplicationRenderContext, options: ApplicationRenderOptions): Promise<string> {
        return foundry.applications.handlebars.renderTemplate(
            "systems/afmbe-idle/templates/actor/creature/task.hbs",
            context,
        );
    }

    protected _replaceHTML(result: string, content: HTMLElement, options: ApplicationRenderOptions): void {
        content.innerHTML = result;
        this.#activateListeners(content);
    }

    #activateListeners(html: HTMLElement) {
        for (const el of html.querySelectorAll("select")) {
            el.addEventListener("change", () => {
                const category = el.name;
                this.#selected[category] = el.value;
            });
        }
    }
}

export { RollTaskApplication };
