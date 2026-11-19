import {
    ApplicationClosingOptions,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import { ApplicationAFMBE, ApplicationConfigurationAFMBE } from "handlebar-application";
import * as R from "remeda";
import { localize, signedNumber } from "utils";
import {
    BaseAttributesTaskSelect,
    BaseDifficultyTaskSelect,
    BaseSkillTaskSelect,
    RollTaskApplicationConfiguration,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelected,
    RollTaskSelectKey,
    RollTaskSelects,
    RollTaskType,
    TaskModifier,
} from ".";
import { Creature, CREATURE_ATTRIBUTES, CREATURE_MODIFIER_TYPES, CreatureAttributes, CreatureModifier } from "..";

const TEST_DIFFICULTIES = ["simple", "difficult"] as const;
const UNTRAINED_RANGE = { max: -2, min: -10 };

class RollTaskApplication extends ApplicationAFMBE<RollTaskApplicationConfiguration> {
    #actor: Creature;
    #disable: RollTaskSelectKey[];
    #modifiers: Collection<string, TaskModifier>;
    #mode: "private" | "public";
    #selected: RollTaskSelected;
    #target: number | undefined;
    #untrained: number = -2;

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
        options: DeepPartial<ApplicationConfigurationAFMBE> &
            Omit<RollTaskApplicationConfiguration, keyof ApplicationConfigurationAFMBE>,
    ) {
        const actor = options.actor;
        const { disable, mode, select, target } = options.data;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#mode = mode ?? "public";

        this.#modifiers = new Collection(
            R.map(actor.system.modifiers, (modifier) => {
                modifier.type = R.isIncludedIn(modifier.type, CREATURE_MODIFIER_TYPES) ? modifier.type : "all";
                return [modifier.id, modifier] as const;
            }),
        );

        this.#selected = foundry.utils.mergeObject(
            { attribute: CREATURE_ATTRIBUTES[0], difficulty: TEST_DIFFICULTIES[0], skill: "" },
            R.isObjectType(select) ? foundry.utils.deepClone(select) : {},
        );

        if (this.#selected.skill === "") {
            this.#selected.difficulty === "standard";
        }

        this.#target = target;
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
            type: "all",
        });

        this.render();
    }

    static toggleModifier(this: RollTaskApplication, _event: PointerEvent, target: HTMLElement) {
        const id = target.closest<HTMLElement>("[data-id]")?.dataset.id;
        if (!id) return;

        const modifier = this.#modifiers.find((modifier) => modifier.id === id);

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

    get isTest(): boolean {
        return this.rollType === "test";
    }

    get isUntrained(): boolean {
        return this.#selected.skill === "untrained";
    }

    get rollType(): RollTaskType {
        return this.#selected.skill === "" ? "test" : "task";
    }

    _initializeApplicationOptions(options: RollTaskApplicationConfiguration): RollTaskApplicationConfiguration {
        const { actor, data } = options;
        options = super._initializeApplicationOptions(options) as RollTaskApplicationConfiguration;
        options.id = "{id}";
        options.uniqueId = `RollTask-${actor.uuid.replaceAll(".", "-")}`;
        options.window.title = `${data.title ?? localize("afmbe.actor.creature.task.title")} - ${actor.name}`;
        return options;
    }

    get attributeSelect(): BaseAttributesTaskSelect {
        return {
            key: "attribute",
            label: localize("afmbe.actor.creature.task.attribute"),
            options: R.map(CREATURE_ATTRIBUTES, (value) => {
                const label = CreatureAttributes.getLabel(value);
                const modifier = signedNumber(this.actor.system.attributes[value]);
                return { value, label: `${label} (${modifier})` };
            }),
        };
    }

    get difficultySelect(): BaseDifficultyTaskSelect {
        return {
            key: "difficulty",
            label: localize("afmbe.actor.creature.task.difficulty.title"),
            options: R.map(this.isTest ? TEST_DIFFICULTIES : (["standard"] as const), (value) => {
                const label = localize("afmbe.actor.creature.task.difficulty", value);
                return { value, label };
            }),
        };
    }

    get skillSelect(): BaseSkillTaskSelect {
        const options: BaseSkillTaskSelect["options"] = R.pipe(
            this.actor.itemTypes.skill,
            R.filter((skill) => !skill.system.isSpecialty),
            R.flatMap((skill) => {
                const specialties = skill.system.deepSpecialties;
                const group = specialties.length ? skill.name : undefined;

                return R.map([skill, ...specialties], ({ chainId, name, system }): FormSelectOption => {
                    return { group, label: `${name} (${system.modifier})`, value: chainId };
                });
            }),
        );

        options.unshift(
            { value: "", label: "" },
            { value: "untrained", label: localize("afmbe.item.skill.untrained.label") },
        );

        return {
            key: "skill",
            label: localize("TYPES.Item.skill"),
            options,
        };
    }

    get modifierInstances(): CreatureModifier[] {
        const rollType = this.rollType;
        const { attribute, difficulty, skill } = this.#selected;

        const modifiers: CreatureModifier[] = [
            {
                id: "attribute",
                label: CreatureAttributes.getLabel(attribute),
                type: "all",
                value: this.actor.system.attributes[attribute] * (difficulty === "simple" ? 2 : 1),
            },
        ];

        if (skill === "untrained") {
            modifiers.push({
                id: "skill",
                label: localize("afmbe.item.skill.untrained.label"),
                type: "task",
                value: this.#untrained,
            });
        } else if (skill !== "") {
            const actorSkill = this.actor.items.get(skill);

            if (actorSkill?.isOfType("skill")) {
                modifiers.push({
                    id: "skill",
                    label: actorSkill.system.label,
                    type: "task",
                    value: actorSkill.system.bonus,
                });
            }
        }

        for (const modifier of this.#modifiers) {
            if (!modifier.active || (modifier.type !== "all" && modifier.type !== rollType)) continue;
            modifiers.push(modifier);
        }

        return modifiers;
    }

    async _prepareContext(): Promise<RollTaskRenderContext> {
        const rollType = this.rollType;
        const modifiers = R.sumBy(this.modifierInstances, R.prop("value"));

        const selects = R.map(
            [this.attributeSelect, this.difficultySelect, this.skillSelect] as const,
            ({ key, label, options }) => {
                return {
                    disable: options.length <= 1 || this.#disable.includes(key),
                    key,
                    label,
                    options,
                    selected: this.#selected[key],
                };
            },
        ) as RollTaskSelects;

        return {
            modifiers: this.#modifiers.filter(({ type }) => type === "all" || type === rollType),
            selects,
            private: this.#mode === "private",
            rollType: this.rollType,
            total: signedNumber(modifiers),
            untrained: this.isUntrained ? { ...UNTRAINED_RANGE, value: this.#untrained } : null,
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

        const privateEl = html.querySelector<HTMLInputElement>(`[name="private"]`);
        if (privateEl) {
            privateEl.addEventListener("change", () => {
                this.#mode = privateEl.checked ? "private" : "public";
            });
        }

        const untrainedEl = html.querySelector<HTMLInputElement>(`[name="untrained"]`);
        if (untrainedEl) {
            untrainedEl.addEventListener("change", () => {
                const { max, min } = UNTRAINED_RANGE;
                this.#untrained = Math.clamp(untrainedEl.valueAsNumber, min, max);
                this.render();
            });
        }
    }
}

export { RollTaskApplication };
