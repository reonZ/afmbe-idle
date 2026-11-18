import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ActorModifier } from "actor/base";
import { ApplicationAFMBE } from "application";
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

class RollTaskApplication extends ApplicationAFMBE {
    #actor: Creature;
    #disable: RollTaskSelectKey[];
    #modifiers: Collection<string, ActorModifier & { active?: boolean }>;
    #mode: "private" | "public";
    #selected: RollTaskSelected;

    static TEMPLATE: string = "systems/afmbe-idle/templates/actor/creature/task.hbs";

    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
        classes: ["task"],
        actions: {
            "add-modifier": this.addModifier,
            "toggle-modifier": this.toggleModifier,
        },
    };

    constructor(
        options: DeepPartial<ApplicationConfiguration> &
            Omit<RollTaskApplicationConfiguration, keyof ApplicationConfiguration>,
    ) {
        const {
            actor,
            data: { disable, modifiers, mode, select },
        } = options;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#mode = mode ?? "public";
        this.#selected = R.isObjectType(select) ? foundry.utils.deepClone(select) : {};
        this.#modifiers = new Collection();
    }

    static addModifier(this: RollTaskApplication, _event: PointerEvent, target: HTMLElement) {
        const id = foundry.utils.randomID();
        const value = target.previousElementSibling as HTMLInputElement;
        const label = value.previousElementSibling as HTMLInputElement;

        this.#modifiers.set(id, {
            active: true,
            id,
            label: label.value.trim() || localize("afmbe.actor.creature.task.modifier.name"),
            value: value.valueAsNumber || 1,
        });

        this.render();
    }

    static toggleModifier(this: RollTaskApplication, _event: PointerEvent, target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-id]")?.dataset.id;
        const modifier = this.#modifiers.get(id ?? "");

        if (modifier) {
            modifier.active = !modifier.active;
            this.render();
        }
    }

    static roll(actor: Creature, data: RollTaskData = {}): RollTaskApplication {
        const app = new this({ actor, data });
        app.render(true);
        return app;
    }

    get actor(): Creature {
        return this.#actor;
    }

    _initializeApplicationOptions(options: RollTaskApplicationConfiguration): RollTaskApplicationConfiguration {
        const { actor, data } = options;
        options = super._initializeApplicationOptions(options) as RollTaskApplicationConfiguration;
        options.id = "{id}";
        options.uniqueId = `RollTask-${actor.uuid.replaceAll(".", "-")}`;
        options.window.title = `${data.title ?? localize("afmbe.actor.creature.task.title")} - ${actor.name}`;
        return options;
    }

    async _prepareContext(): Promise<RollTaskRenderContext> {
        const selects: RollTaskTruncatedSelects = [
            {
                key: "difficulty",
                label: localize("afmbe.actor.creature.task.difficulty.title"),
                options: R.map(["difficult", "simple"] as const, (value) => {
                    const label = localize("afmbe.actor.creature.task.difficulty", value);
                    return { value, label };
                }),
            },
            {
                key: "attribute",
                label: localize("afmbe.actor.creature.task.attribute"),
                options: R.map(CREATURE_ATTRIBUTES, (value) => {
                    const label = CreatureAttributes.getLabel(value);
                    return { value, label };
                }),
            },
            {
                blank: true,
                key: "skill",
                label: localize("afmbe.actor.creature.task.skill.label"),
                options: R.pipe(
                    this.actor.itemTypes.skill,
                    R.filter((skill) => !skill.system.isSpecialty),
                    R.flatMap((skill) => {
                        const specialties = skill.system.deepSpecialties;
                        const group = specialties.length ? skill.name : undefined;

                        return R.map([skill, ...specialties], ({ chainId, name, system }): FormSelectOption => {
                            return { group, label: `${name} (${system.modifier})`, value: chainId };
                        });
                    }),
                ),
            },
        ];

        return {
            modifiers: this.#modifiers,
            selects: R.map(selects, ({ blank, key, label, options }) => {
                return {
                    blank: blank ? "" : undefined,
                    disable: options.length === 0 || this.#disable.includes(key),
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
        await super._onFirstRender(context, options);
        this.actor.apps[this.id] = this;
    }

    _onClose(options: ApplicationClosingOptions): void {
        super._onClose(options);
        delete this.actor.apps[this.id];
    }

    _activateListeners(html: HTMLElement) {
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

export { RollTaskApplication };
