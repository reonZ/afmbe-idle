import type { ApplicationRenderContext } from "@7h3laughingman/foundry-types/client/applications/_module.mjs";
import type { CreatureAFMBE, CreatureAttributeType, CreatureModifier } from "actor";
import type { TaskRollType, TaskTarget } from "roll";
import type { ApplicationConfigurationAFMBE, TEST_DIFFICULTIES } from "..";

type TaskApplicationRenderContext = ApplicationRenderContext & {
    modifiers: CreatureModifier[];
    selects: TaskApplicationSelects;
    private: boolean;
    rollType: TaskRollType;
    total: string;
    untrained: { max: number; min: number; value: number } | null;
};

type TestDifficulty = (typeof TEST_DIFFICULTIES)[number];

type TaskApplicationSelects = [
    TaskApplicationSelect<"attribute", CreatureAttributeType>,
    TaskApplicationSelect<"difficulty", TestDifficulty | "standard">,
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
    options: SelectOption<V>[];
    selected: V | undefined;
};

type TaskApplicationData = {
    disable?: TaskApplicationSelectKey[];
    mode?: "private" | "public";
    select?: Partial<TaskApplicationSelected>;
    target?: Partial<TaskTarget>;
};

type TaskApplicationConfiguration = ApplicationConfigurationAFMBE & {
    actor: CreatureAFMBE;
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
    TestDifficulty,
};
