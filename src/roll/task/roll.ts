import { RollOptions } from "@7h3laughingman/foundry-types/client/dice/_types.mjs";

class TaskRoll extends Roll {
    constructor(data?: Record<string, unknown>, options?: RollOptions) {
        super("1d10", data, options);
    }
}

export { TaskRoll };
