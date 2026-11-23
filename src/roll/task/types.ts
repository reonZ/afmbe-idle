import {
    ArrayField,
    ModelPropsFromSchema,
    NumberField,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";
import type { CreatureAttributeType, CreatureModifierType } from "actor";
import type { TaskRoll } from "./roll";

type TaskTargetSchema = {
    attribute: StringField<CreatureAttributeType, CreatureAttributeType, false, true, false>;
    traits: ArrayField<StringField<string, string, true, false, false>, string[], string[], false, true, false>;
    value: NumberField<number, number, false, true, false>;
};

type TaskTarget = ModelPropsFromSchema<TaskTargetSchema>;

type TaskRollType = Exclude<CreatureModifierType, "all">;

type TaskDieResult = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type EvaluatedTaskRolls = TupleOf<Rolled<TaskRoll>>;

type ResolvedTaskRolls = { strikeLast: boolean; value: number };

export type { EvaluatedTaskRolls, ResolvedTaskRolls, TaskDieResult, TaskRollType, TaskTarget, TaskTargetSchema };
