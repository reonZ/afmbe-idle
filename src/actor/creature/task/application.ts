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
    RollTaskSelects,
    RollTaskSelectKey,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelected,
    RollTaskTruncatedSelects,
    RollTaskModifier,
} from ".";
import { Creature, CREATURE_ATTRIBUTES, CreatureAttributesModule } from "..";

class RollTaskApplication extends foundry.applications.api.ApplicationV2 {
    #actor: Creature;
    #disable: RollTaskSelectKey[];
    #event: PointerEvent | undefined;
    #hide: RollTaskSelectKey[];
    #modifiers: Record<string, RollTaskModifier>;
    #selected: RollTaskSelected;

    constructor(
        options: DeepPartial<ApplicationConfiguration> &
            Omit<RollTaskApplicationConfiguration, keyof ApplicationConfiguration>,
    ) {
        const {
            actor,
            data: { disable, hide, modifiers, select },
            event,
        } = options;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#event = event;
        this.#hide = R.isArray(hide) ? hide.slice() : [];
        this.#selected = R.isObjectType(select) ? foundry.utils.deepClone(select) : {};

        this.#modifiers = R.pipe(
            R.isArray(modifiers) ? modifiers : [],
            R.map((id): RollTaskModifier | undefined => {
                const [itemId, embeddedId] = R.split(id, ".");
                const item = actor.items.get(itemId);
                if (!item?.isOfType("skill")) return;

                if (!embeddedId) {
                    return { id: item.id, label: item.name, value: item.system.level };
                }

                const specialty = item.specialties.get(embeddedId);
                if (!specialty) return;

                return { id: specialty.longId, label: specialty.label, value: specialty.total };
            }),
            R.filter(R.isTruthy),
            R.indexBy(R.prop("id")),
        );
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
        const selects: RollTaskTruncatedSelects = [
            {
                key: "difficulty",
                label: localize("actor.creature.task.difficulty.title"),
                options: R.map(["difficult", "simple"] as const, (value) => {
                    const label = localize("actor.creature.task.difficulty", value);
                    return { value, label };
                }),
            },
            {
                key: "attribute",
                label: localize("actor.creature.task.attribute"),
                options: R.map(CREATURE_ATTRIBUTES, (value) => {
                    const label = CreatureAttributesModule.getLabel(value);
                    return { value, label };
                }),
            },
            {
                blank: true,
                key: "skill",
                label: localize("actor.creature.task.skill"),
                options: R.flatMap(this.actor.itemTypes.skill, (item) => {
                    const entries: { value: string; label: string }[] = [];

                    if (!this.#modifiers[item.id]) {
                        const label = `${item.name} (${item.bonus})`;
                        entries.push({ label, value: item.id });
                    }

                    for (const specialty of item.specialties) {
                        const value = specialty.longId;
                        if (this.#modifiers[value]) continue;

                        const label = `${specialty.label} (${specialty.bonus})`;
                        entries.push({ label, value });
                    }

                    return entries;
                }),
            },
        ];

        return {
            selects: R.map(selects, ({ blank, key, label, options }) => {
                return {
                    blank: blank ? "" : undefined,
                    disable: options.length === 0 || this.#disable.includes(key),
                    hide: this.#hide.includes(key),
                    key,
                    label,
                    options,
                    selected: this.#selected[key],
                };
            }) as RollTaskSelects,
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
                const category = el.name as RollTaskSelectKey;
                this.#selected[category] = el.value as any;
            });
        }
    }
}

export { RollTaskApplication };
