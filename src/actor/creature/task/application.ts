import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import * as R from "remeda";
import { localize } from "utils";
import {
    RollTaskApplicationConfiguration,
    RollTaskCategories,
    RollTaskCategoryKey,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelected,
    RollTaskTruncatedCategories,
} from ".";
import { Creature, CREATURE_ATTRIBUTES, CreatureAttributesModule } from "..";

class RollTaskApplication extends foundry.applications.api.ApplicationV2 {
    #actor: Creature;
    #disable: RollTaskCategoryKey[];
    #event: PointerEvent | undefined;
    #hide: RollTaskCategoryKey[];
    #selected: RollTaskSelected;

    constructor(
        options: DeepPartial<ApplicationConfiguration> &
            Omit<RollTaskApplicationConfiguration, keyof ApplicationConfiguration>,
    ) {
        const { actor, data, event } = options;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(data.disable) ? data.disable.slice() : [];
        this.#event = event;
        this.#hide = R.isArray(data.hide) ? data.hide.slice() : [];
        this.#selected = R.isObjectType(data.select) ? foundry.utils.deepClone(data.select) : {};
    }

    static roll(actor: Creature, data: RollTaskData, event?: PointerEvent): RollTaskApplication {
        const app = new this({ actor, data, event });
        app.render(true);
        return app;
    }

    get actor(): Creature {
        return this.#actor;
    }

    protected _initializeApplicationOptions(
        options: RollTaskApplicationConfiguration,
    ): RollTaskApplicationConfiguration {
        const { actor, data } = options;
        options = super._initializeApplicationOptions(options) as RollTaskApplicationConfiguration;
        options.id = "{id}";
        options.uniqueId = `RollTask-${actor.uuid.replaceAll(".", "-")}`;
        options.window.title = `${data.title ?? localize("actor.creature.task.title")} - ${actor.name}`;
        return options;
    }

    async _prepareContext(): Promise<RollTaskRenderContext> {
        const categories: RollTaskTruncatedCategories = [
            {
                key: "difficulty",
                label: localize("actor.creature.task.difficulty.title"),
                options: R.map(["difficult", "simple"] as const, (value) => {
                    return { value, label: localize("actor.creature.task.difficulty", value) };
                }),
            },
            {
                key: "attribute",
                label: localize("actor.creature.task.attribute"),
                options: R.map(CREATURE_ATTRIBUTES, (value) => {
                    return { value, label: CreatureAttributesModule.getLabel(value) };
                }),
            },
            {
                blank: true,
                key: "skill",
                label: localize("actor.creature.task.skill"),
                options: R.flatMap(this.actor.itemTypes.skill, (item) => {
                    return [
                        { value: item.id, label: `${item.name} (${item.bonus})` },
                        ...item.specialties.map((specialty) => {
                            const label = `${specialty.label} (${specialty.bonus})`;
                            return { value: specialty.uuid, label };
                        }),
                    ];
                }),
            },
        ];

        return {
            categories: R.map(categories, ({ blank, key, label, options }) => {
                return {
                    blank: blank ? "" : undefined,
                    disable: options.length === 0 || this.#disable.includes(key),
                    hide: this.#hide.includes(key),
                    key,
                    label,
                    options,
                    selected: this.#selected[key],
                };
            }) as RollTaskCategories,
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
                const category = el.name as RollTaskCategoryKey;
                this.#selected[category] = el.value as any;
            });
        }
    }
}

export { RollTaskApplication };
