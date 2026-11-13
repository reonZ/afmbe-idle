import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ActorModifier } from "actor/base";
import * as R from "remeda";
import { localize } from "utils";
import {
    RollTaskApplicationConfiguration,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelected,
    RollTaskSelectKey,
    RollTaskSelects,
    RollTaskTruncatedSelects,
} from ".";
import { Creature, CREATURE_ATTRIBUTES, CreatureAttributes } from "..";

class RollTaskApplication extends foundry.applications.api.ApplicationV2 {
    #actor: Creature;
    #disable: RollTaskSelectKey[];
    #hide: RollTaskSelectKey[];
    #modifiers: Collection<string, ActorModifier>;
    #mode: "private" | "public";
    #selected: RollTaskSelected;

    constructor(
        options: DeepPartial<ApplicationConfiguration> &
            Omit<RollTaskApplicationConfiguration, keyof ApplicationConfiguration>,
    ) {
        const {
            actor,
            data: { disable, hide, modifiers, mode, select },
        } = options;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#hide = R.isArray(hide) ? hide.slice() : [];
        this.#mode = mode ?? "public";
        this.#selected = R.isObjectType(select) ? foundry.utils.deepClone(select) : {};

        this.#modifiers = new Collection();
        //         this.#modifiers = R.pipe(
        //             R.isArray(modifiers) ? modifiers : [],
        //             R.map((id): ActorModifier | undefined => {
        //                 const [itemId, slug] = R.split(id, ".");
        //                 const item = actor.items.get(itemId);
        //                 if (!item?.isOfType("skill")) return;
        //
        //                 if (!slug) {
        //                     return { id: item.id, label: item.name, value: item.system.level.value };
        //                 }
        //
        //                 const specialty = item.system.specialties[slug];
        //                 if (!specialty) return;
        //
        //                 return { id: specialty.longId, label: specialty.label, value: specialty.total };
        //             }),
        //             R.filter(R.isTruthy),
        //             R.indexBy(R.prop("id")),
        //         );
    }

    static roll(actor: Creature, data: RollTaskData = {}): RollTaskApplication {
        const app = new this({ actor, data });
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
                    const label = CreatureAttributes.getLabel(value);
                    return { value, label };
                }),
            },
            {
                blank: true,
                key: "skill",
                label: localize("actor.creature.task.skill.label"),
                options: R.flatMap(this.actor.itemTypes.skill, (item) => {
                    const specialties = R.values(item.system.specialties);
                    const group = specialties.length ? item.name : undefined;
                    const name = group ? localize("actor.creature.task.skill.base") : item.name;

                    return [
                        {
                            label: `${name} (${item.system.modifier})`,
                            value: item.id,
                            group,
                        },
                        ...R.map(specialties, (specialty): FormSelectOption => {
                            return {
                                label: `- ${specialty.name} (${specialty.modifier})`,
                                value: specialty.longId,
                                group,
                            };
                        }),
                    ];
                }),
            },
        ];

        return {
            modifiers: {
                added: this.#modifiers.contents,
                available: [],
            },
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
            private: this.#mode === "private",
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

    protected _renderHTML(context: ApplicationRenderContext, _options: ApplicationRenderOptions): Promise<string> {
        return foundry.applications.handlebars.renderTemplate(
            "systems/afmbe-idle/templates/actor/creature/task.hbs",
            context,
        );
    }

    protected _replaceHTML(result: string, content: HTMLElement, _options: ApplicationRenderOptions): void {
        content.innerHTML = result;
        this.#activateListeners(content);
    }

    protected _onClickAction(_event: PointerEvent, target: HTMLElement): void {
        const action = target.dataset.action as EventAction;

        switch (action) {
            case "add-modifier":
                return this.#addModifier(target);
            case "delete-modifier":
                return this.#deleteModifier(target);
        }
    }

    #deleteModifier(target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-id]")?.dataset.id;
        this.#modifiers.delete(id ?? "");
        this.render();
    }

    #addModifier(target: HTMLElement) {
        const id = foundry.utils.randomID();
        const value = target.previousElementSibling as HTMLInputElement;
        const label = value.previousElementSibling as HTMLInputElement;

        this.#modifiers.set(id, {
            id,
            label: label.value.trim() || localize("actor.creature.task.modifier.manual"),
            value: value.valueAsNumber,
        });

        this.render();
    }

    #activateListeners(html: HTMLElement) {
        for (const el of html.querySelectorAll<HTMLSelectElement>(".select select")) {
            el.addEventListener("change", () => {
                const category = el.name as RollTaskSelectKey;
                this.#selected[category] = el.value as any;
            });
        }

        const privateEl = html.querySelector<HTMLInputElement>(".private input");
        if (privateEl) {
            privateEl.addEventListener("change", () => {
                this.#mode = privateEl.checked ? "private" : "public";
            });
        }
    }
}

type EventAction = "add-modifier" | "delete-modifier";

export { RollTaskApplication };
