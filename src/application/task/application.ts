import {
    ApplicationClosingOptions,
    ApplicationRenderOptions,
} from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import { Creature, CREATURE_ATTRIBUTES, CREATURE_MODIFIER_TYPES, CreatureAttributes, CreatureModifier } from "actor";
import { PreCreateTaskMessageSource } from "chat-message";
import * as R from "remeda";
import { TaskRollType } from "roll";
import { localize, signedNumber } from "utils";
import {
    BaseTaskApplicationAttributesSelect,
    BaseTaskApplicationDifficultySelect,
    BaseTaskApplicationSkillSelect,
    TaskApplicationConfiguration,
    TaskApplicationData,
    TaskApplicationRenderContext,
    TaskApplicationSelected,
    TaskApplicationSelectKey,
    TaskApplicationSelects,
} from ".";
import { ApplicationAFMBE, ApplicationConfigurationAFMBE } from "..";

const TEST_DIFFICULTIES = ["simple", "difficult"] as const;
const UNTRAINED_RANGE = { max: -2, min: -10 };

class TaskApplication extends ApplicationAFMBE<TaskApplicationConfiguration> {
    #actor: Creature;
    #disable: TaskApplicationSelectKey[];
    #modifiers: CreatureModifier[];
    #private: boolean;
    #selected: TaskApplicationSelected;
    #target: number | undefined;
    #untrained: number = -2;

    static DEFAULT_OPTIONS: DeepPartial<TaskApplicationConfiguration> = {
        classes: ["task"],
        position: { height: 450, width: 600 },
        actions: {
            "add-modifier": this.#addModifier,
            "cancel-roll": this.#cancelRoll,
            "roll-task": this.#rollTask,
            "toggle-modifier": this.#toggleModifier,
        },
        scrollable: [".panel.right"],
    };

    constructor(
        options: DeepPartial<ApplicationConfigurationAFMBE> &
            Omit<TaskApplicationConfiguration, keyof ApplicationConfigurationAFMBE>,
    ) {
        const actor = options.actor;
        const { disable, mode, select = {}, target } = options.data;

        super(options);

        this.#actor = actor;
        this.#disable = R.isArray(disable) ? disable.slice() : [];
        this.#modifiers = R.map(actor.system.modifiers, (modifier) => {
            const type = R.isIncludedIn(modifier.type, CREATURE_MODIFIER_TYPES) ? modifier.type : "all";
            return { ...modifier, type };
        });
        this.#private = mode === "private";
        this.#selected = foundry.utils.mergeObject(
            { attribute: CREATURE_ATTRIBUTES[0], difficulty: TEST_DIFFICULTIES[0], skill: "" } as const,
            R.isObjectType(select) ? foundry.utils.deepClone(select) : {},
        );
        this.#target = target;
    }

    static #addModifier(this: TaskApplication, _event: PointerEvent, target: HTMLElement) {
        const value = target.previousElementSibling as HTMLInputElement;
        const label = value.previousElementSibling as HTMLInputElement;

        this.#modifiers.push({
            active: true,
            label: label.value.trim() || localize("afmbe.actor.creature.task.modifier.name"),
            origin: null,
            type: "all",
            value: value.valueAsNumber || 1,
        });

        this.render();
    }

    static #cancelRoll(this: TaskApplication) {
        this.close();
    }

    static create(actor: Creature, data: TaskApplicationData = {}): TaskApplication {
        const app = new this({ actor, data });
        app.render(true);
        return app;
    }

    static async #rollTask(this: TaskApplication) {
        const data: PreCreateTaskMessageSource = {
            speaker: ChatMessage.implementation.getSpeaker({ actor: this.actor }),
            system: {
                category: this.rollType,
                modifiers: this.modifierInstances,
                target: this.#target,
            },
            type: "task",
        };

        ChatMessage.implementation.create(data, { messageMode: this.#private ? "blind" : "public" });
        this.close();
    }

    static #toggleModifier(this: TaskApplication, _event: PointerEvent, target: HTMLElement) {
        const index = Number(target.dataset.index);
        if (isNaN(index)) return;

        const modifier = this.#modifiers[index];

        if (modifier) {
            modifier.active = !modifier.active;
            this.render();
        }
    }

    get actor(): Creature {
        return this.#actor;
    }

    get isTask(): boolean {
        return this.rollType === "task";
    }

    get isTest(): boolean {
        return this.rollType === "test";
    }

    get isUntrained(): boolean {
        return this.#selected.skill === "untrained";
    }

    get rollType(): TaskRollType {
        return this.#selected.skill === "" ? "test" : "task";
    }

    get template(): string {
        return "systems/afmbe-idle/templates/actor/creature/task.hbs";
    }

    _initializeApplicationOptions(options: TaskApplicationConfiguration): TaskApplicationConfiguration {
        const { actor } = options;
        options = super._initializeApplicationOptions(options) as TaskApplicationConfiguration;
        options.id = "{id}";
        options.uniqueId = `RollTask-${actor.uuid.replaceAll(".", "-")}`;
        options.window.title = `${localize("afmbe.actor.creature.task.title")} - ${actor.name}`;
        return options;
    }

    get attributeSelect(): BaseTaskApplicationAttributesSelect {
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

    get difficultySelect(): BaseTaskApplicationDifficultySelect {
        return {
            key: "difficulty",
            label: localize("afmbe.actor.creature.task.difficulty.title"),
            options: R.map(this.isTest ? TEST_DIFFICULTIES : (["standard"] as const), (value) => {
                const label = localize("afmbe.actor.creature.task.difficulty", value);
                return { value, label };
            }),
        };
    }

    get skillSelect(): BaseTaskApplicationSkillSelect {
        const options: BaseTaskApplicationSkillSelect["options"] = R.pipe(
            this.actor.itemTypes.skill,
            R.filter((skill) => !skill.system.isSpecialty),
            R.flatMap((skill) => {
                const specialties = skill.system.deepSpecialties;
                const group = specialties.length ? skill.name : undefined;

                return R.map([skill, ...specialties], ({ chainId, name, system }) => {
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
                active: true,
                label: CreatureAttributes.getLabel(attribute),
                origin: null,
                type: "all",
                value: this.actor.system.attributes[attribute] * (this.isTask ? 1 : difficulty === "simple" ? 2 : 1),
            },
        ];

        if (skill === "untrained") {
            modifiers.push({
                active: true,
                label: localize("afmbe.item.skill.untrained.label"),
                origin: null,
                type: "task",
                value: this.#untrained,
            });
        } else if (skill !== "") {
            const actorSkill = this.actor.items.get(skill);

            if (actorSkill?.isOfType("skill")) {
                modifiers.push({
                    active: true,
                    label: actorSkill.system.label,
                    origin: actorSkill.uuid,
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

    async _prepareContext(): Promise<TaskApplicationRenderContext> {
        const rollType = this.rollType;
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
        ) as TaskApplicationSelects;

        return {
            modifiers: this.#modifiers.filter(({ type }) => type === "all" || type === rollType),
            selects,
            private: this.#private,
            rollType: this.rollType,
            total: signedNumber(R.sumBy(this.modifierInstances, R.prop("value"))),
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
                const category = el.name as TaskApplicationSelectKey;
                this.#selected[category] = el.value as never;
                this.render();
            });
        }

        const privateEl = html.querySelector<HTMLInputElement>(`[name="private"]`);
        if (privateEl) {
            privateEl.addEventListener("change", () => {
                this.#private = privateEl.checked;
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

export { TaskApplication };
