import {
    ApplicationClosingOptions,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ActorModifier } from "actor/base";
import { ApplicationAFMBE } from "handlebar-application";
import * as R from "remeda";
import { localize, signedNumber } from "utils";
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

const TASK_DIFFICULTIES = ["standard", "simple"] as const;

class RollTaskApplication extends ApplicationAFMBE<RollTaskApplicationConfiguration> {
    #actor: Creature;
    #disable: RollTaskSelectKey[];
    #modifiers: Collection<string, ActorModifier & { active?: boolean }>;
    #mode: "private" | "public";
    #selected: RollTaskSelected;

    static TEMPLATE: string = "systems/afmbe-idle/templates/actor/creature/task.hbs";

    static DEFAULT_OPTIONS: DeepPartial<RollTaskApplicationConfiguration> = {
        classes: ["task"],
        position: { height: 450, width: 600 },
        actions: {
            "add-modifier": this.addModifier,
            "toggle-modifier": this.toggleModifier,
        },
        scrollable: [".panel.right"],
    };

    constructor(
        options: DeepPartial<Omit<RollTaskApplicationConfiguration, "actor" | "data">> &
            Pick<RollTaskApplicationConfiguration, "actor" | "data">,
    ) {
        const actor = options.actor;
        const { disable, mode, select } = options.data;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#mode = mode ?? "public";

        this.#selected = foundry.utils.mergeObject(
            { attribute: CREATURE_ATTRIBUTES[0], difficulty: TASK_DIFFICULTIES[0], skill: "" },
            R.isObjectType(select) ? foundry.utils.deepClone(select) : {},
        );

        this.#modifiers = new Collection(R.map(actor.system.modifiers, (modifier) => [modifier.id, modifier] as const));
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

    static create(actor: Creature, data: RollTaskData = {}): RollTaskApplication {
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
        const preSelects: RollTaskTruncatedSelects = [
            {
                key: "attribute",
                label: localize("afmbe.actor.creature.task.attribute"),
                options: R.map(CREATURE_ATTRIBUTES, (value) => {
                    const label = CreatureAttributes.getLabel(value);
                    const modifier = signedNumber(this.actor.system.attributes[value]);
                    return { value, label: `${label} (${modifier})` };
                }),
            },
            {
                key: "difficulty",
                label: localize("afmbe.actor.creature.task.difficulty.title"),
                options: R.map(TASK_DIFFICULTIES, (value) => {
                    const label = localize("afmbe.actor.creature.task.difficulty", value);
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

        const attributeValue = this.actor.system.attributes[this.#selected.attribute];
        const attributeModifier = attributeValue * (this.#selected.difficulty === "standard" ? 1 : 2);
        const selectedSkill = this.actor.items.get(this.#selected.skill);
        const skillModifier = selectedSkill?.isOfType("skill") ? selectedSkill.system.bonus : 0;
        const modifiers = R.pipe(
            this.#modifiers.contents,
            R.filter((modifier) => !!modifier.active),
            R.map((modifier) => modifier.value),
            R.sum(),
        );

        return {
            modifiers: this.#modifiers,
            selects: R.map(preSelects, ({ blank, key, label, options }) => {
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
            total: signedNumber(attributeModifier + skillModifier + modifiers),
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
        for (const el of html.querySelectorAll<HTMLSelectElement>("select")) {
            el.addEventListener("change", () => {
                const category = el.name as RollTaskSelectKey;
                this.#selected[category] = el.value as never;
                this.render();
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
