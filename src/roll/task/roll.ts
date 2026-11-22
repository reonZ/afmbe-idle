import { RollOptions } from "@7h3laughingman/foundry-types/client/dice/_types.mjs";
import { EvaluatedTaskRolls, ResolvedTaskRolls, TaskDieResult } from ".";
import { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";

class TaskRoll extends Roll {
    constructor(_formula: string, data: Record<string, any>, options?: RollOptions) {
        super("1d10", data, options);
    }

    static async evaluate(options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const roll = await new this("1d10", {}, options).evaluate();

        if (roll.isOne) {
            return this.evaluateRuleOfOne(roll, options);
        }

        if (roll.isTen) {
            return this.evaluateRuleOfTen(roll, options);
        }

        return [roll];
    }

    static async evaluateRuleOfOne(roll: Rolled<TaskRoll>, options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const rolls: EvaluatedTaskRolls = [roll];

        while (roll.isOne) {
            roll = await new this("1d10", {}, options).evaluate();
            rolls.push(roll);
        }

        return rolls;
    }

    static async evaluateRuleOfTen(roll: Rolled<TaskRoll>, options?: RollOptions): Promise<EvaluatedTaskRolls> {
        const rolls: EvaluatedTaskRolls = [roll];

        while (roll.isTen) {
            roll = await new this("1d10", {}, options).evaluate();
            rolls.push(roll);
        }

        return rolls;
    }

    static resolveRolls(rolls: EvaluatedTaskRolls): ResolvedTaskRolls {
        if (rolls[0].isOne) {
            return this.resolveOneRule(rolls);
        }

        if (rolls[0].isTen) {
            return this.resolveTenRule(rolls);
        }

        return { strikeLast: false, value: rolls[0].total };
    }

    static resolveOneRule(rolls: EvaluatedTaskRolls): ResolvedTaskRolls {
        let value = 1;

        for (const roll of rolls.slice(1)) {
            if (roll.total >= 5) {
                return { strikeLast: true, value };
            }

            if (value === 1 && roll.isOne) {
                value = -5;
                continue;
            }

            value += roll.total - 5;
        }

        return { strikeLast: false, value };
    }

    static resolveTenRule(rolls: EvaluatedTaskRolls): ResolvedTaskRolls {
        let value = 10;

        for (const roll of rolls.slice(1)) {
            if (roll.total <= 5) {
                return { strikeLast: true, value };
            }

            value += roll.total - 5;
        }

        return { strikeLast: false, value };
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
