import type { CreatureModifierType } from "actor";

type TaskRollType = Exclude<CreatureModifierType, "all">;

type TaskDieResult = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type { TaskDieResult, TaskRollType };
