import type { ApplicationRenderContext } from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import type { FormSelectOption } from "@7h3laughingman/foundry-types/client/applications/forms/fields.mjs";
import type { ApplicationConfigurationAFMBE } from "handlebar-application";
import type { Creature, CreatureAttributeType, CreatureModifier, CreatureModifierType } from "..";

type RollTaskType = Exclude<CreatureModifierType, "all">;

type RollTaskRenderContext = ApplicationRenderContext & {
    modifiers: CreatureModifier[];
    selects: RollTaskSelects;
    private: boolean;
    rollType: RollTaskType;
    total: string;
    untrained: { max: number; min: number; value: number } | null;
};

type RollTaskSelects = [
    RollTaskSelect<"attribute", CreatureAttributeType>,
    RollTaskSelect<"difficulty", "difficult" | "simple" | "standard">,
    RollTaskSelect<"skill", "" | "untrained" | (string & {})>,
];

type BaseTaskSelect<T extends RollTaskSelects[number]> = Pick<T, "key" | "label" | "options">;

type BaseAttributesTaskSelect = BaseTaskSelect<RollTaskSelects[0]>;
type BaseDifficultyTaskSelect = BaseTaskSelect<RollTaskSelects[1]>;
type BaseSkillTaskSelect = BaseTaskSelect<RollTaskSelects[2]>;

type RollTaskSelect<K extends string, V extends string> = {
    disable: boolean;
    key: K;
    label: string;
    options: RollTaskSelectOption<V>[];
    selected: V | undefined;
};

type RollTaskSelectOption<V extends string = string> = Omit<FormSelectOption, "value"> & { value: V };

type RollTaskData = {
    disable?: RollTaskSelectKey[];
    mode?: "private" | "public";
    select?: RollTaskSelected;
    target?: number;
};

type RollTaskApplicationConfiguration = ApplicationConfigurationAFMBE & {
    actor: Creature;
    data: RollTaskData;
};

type RollTaskSelectKey = RollTaskSelects[number]["key"];

type RollTaskSelected = {
    [k in RollTaskSelectKey]: Extract<RollTaskSelects[number], { key: k }>["options"][number]["value"];
};

type TaskDieResult = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type {
    BaseAttributesTaskSelect,
    BaseDifficultyTaskSelect,
    BaseSkillTaskSelect,
    RollTaskApplicationConfiguration,
    RollTaskData,
    RollTaskRenderContext,
    RollTaskSelect,
    RollTaskSelected,
    RollTaskSelectKey,
    RollTaskSelects,
    RollTaskType,
    TaskDieResult,
};
