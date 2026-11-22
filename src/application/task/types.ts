import type { ApplicationRenderContext } from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import type { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import type { Creature, CreatureAttributeType, CreatureModifier } from "actor";
import type { ApplicationConfigurationAFMBE } from "handlebars-application";
import type { TaskRollType } from "roll";

type TaskApplicationRenderContext = ApplicationRenderContext & {
    modifiers: CreatureModifier[];
    selects: TaskApplicationSelects;
    private: boolean;
    rollType: TaskRollType;
    total: string;
    untrained: { max: number; min: number; value: number } | null;
};

type TaskApplicationSelects = [
    TaskApplicationSelect<"attribute", CreatureAttributeType>,
    TaskApplicationSelect<"difficulty", "difficult" | "simple" | "standard">,
    TaskApplicationSelect<"skill", "" | "untrained" | (string & {})>,
];

type BaseTaskApplicationSelect<T extends TaskApplicationSelects[number]> = Pick<T, "key" | "label" | "options">;

type BaseTaskApplicationAttributesSelect = BaseTaskApplicationSelect<TaskApplicationSelects[0]>;
type BaseTaskApplicationDifficultySelect = BaseTaskApplicationSelect<TaskApplicationSelects[1]>;
type BaseTaskApplicationSkillSelect = BaseTaskApplicationSelect<TaskApplicationSelects[2]>;

type TaskApplicationSelect<K extends string, V extends string> = {
    disable: boolean;
    key: K;
    label: string;
    options: (Omit<FormSelectOption, "value"> & { value: V })[];
    selected: V | undefined;
};

type TaskApplicationData = {
    disable?: TaskApplicationSelectKey[];
    mode?: "private" | "public";
    select?: TaskApplicationSelected;
    target?: number;
};

type TaskApplicationConfiguration = ApplicationConfigurationAFMBE & {
    actor: Creature;
    data: TaskApplicationData;
};

type TaskApplicationSelectKey = TaskApplicationSelects[number]["key"];

type TaskApplicationSelected = {
    [k in TaskApplicationSelectKey]: Extract<TaskApplicationSelects[number], { key: k }>["options"][number]["value"];
};

export type {
    BaseTaskApplicationAttributesSelect,
    BaseTaskApplicationDifficultySelect,
    BaseTaskApplicationSkillSelect,
    TaskApplicationConfiguration,
    TaskApplicationData,
    TaskApplicationRenderContext,
    TaskApplicationSelect,
    TaskApplicationSelected,
    TaskApplicationSelectKey,
    TaskApplicationSelects,
};
