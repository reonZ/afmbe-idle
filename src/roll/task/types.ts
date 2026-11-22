import type { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";
import type { CreatureModifierType } from "actor";
import type { TaskRoll } from "./roll";

type TaskRollType = Exclude<CreatureModifierType, "all">;

type TaskDieResult = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type EvaluatedTaskRolls = TupleOf<Rolled<TaskRoll>>;

export type { EvaluatedTaskRolls, TaskDieResult, TaskRollType };
