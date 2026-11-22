import { RollOptions } from "@7h3laughingman/foundry-types/client/dice/_types.mjs";
import { EvaluatedTaskRolls, TaskDieResult } from ".";

class TaskRoll extends Roll {
    constructor(options?: RollOptions) {
        super("1d10", {}, options);
    }

    static async evaluate(options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const roll = await new this(options).evaluate();

        if (roll.isOne) {
            return this.ruleOfOne([roll], options);
        }

        if (roll.isTen) {
            return this.ruleOfTen([roll], options);
        }

        return [roll];
    }

    static async ruleOfOne(rolls: EvaluatedTaskRolls, options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const roll = await new this(options).evaluate();

        rolls.push(roll);

        if (roll.total >= 5) {
            return rolls;
        }

        if (roll.isOne) {
            return this.ruleOfOne(rolls, options);
        }

        return rolls;
    }

    static async ruleOfTen(rolls: EvaluatedTaskRolls, options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const roll = await new this(options).evaluate();

        rolls.push(roll);

        if (roll.total <= 5) {
            return rolls;
        }

        if (roll.isTen) {
            return this.ruleOfTen(rolls);
        }

        return rolls;
    }

    get isOne(): boolean | void {
        return this.total === 1;
    }

    get isTen(): boolean | void {
        return this.total === 10;
    }
}

interface TaskRoll {
    get total(): TaskDieResult | undefined;
}

export { TaskRoll };
