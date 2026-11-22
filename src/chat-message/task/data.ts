import { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";
import { DatabaseCreateCallbackOptions } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { CREATURE_TASK_CATEGORIES } from "actor";
import { UserAFMBE } from "misc";
import { EvaluatedTaskRolls, TaskDieResult, TaskRoll } from "roll";
import { localize } from "utils";
import {
    TaskChatMessage,
    TaskMessageContext,
    TaskMessageDataSchema,
    TaskMessageDataSource,
    TaskMessageSource,
} from ".";
import { ChatMessageDataModel } from "..";
import fields = foundry.data.fields;

class TaskMessageDataModel extends ChatMessageDataModel<TaskMessageDataSchema> {
    static defineSchema(): TaskMessageDataSchema {
        return {
            ...super.defineSchema(),
            category: new fields.StringField({
                required: true,
                nullable: false,
                blank: false,
                choices: CREATURE_TASK_CATEGORIES,
            }),
            modifiers: new fields.ArrayField(
                new fields.SchemaField({
                    label: new fields.StringField({
                        required: true,
                        nullable: false,
                        blank: false,
                    }),
                    origin: new fields.DocumentUUIDField({
                        embedded: true,
                        type: "Item",
                    }),
                    value: new fields.NumberField({
                        required: true,
                        nullable: false,
                        integer: true,
                    }),
                }),
            ),
            target: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                positive: true,
                initial: undefined,
            }),
        };
    }

    get baseRoll(): Rolled<TaskRoll> {
        return this.rolls[0];
    }

    get rolls(): EvaluatedTaskRolls {
        return this.parent.rolls as EvaluatedTaskRolls;
    }

    get template(): string {
        return "systems/afmbe-idle/templates/message/task.hbs";
    }

    async prepareContext(): Promise<TaskMessageContext> {
        const header = localize("afmbe.actor.creature.task.roll", this.category);
        return { header };
    }

    evaluateRolls(): TaskDieResult {
        if (this.baseRoll.isOne) {
        }

        if (this.baseRoll.isTen) {
        }

        return this.baseRoll.total;
    }

    async _preCreate(
        data: DeepPartial<TaskMessageSource>,
        _options: DatabaseCreateCallbackOptions,
        _user: UserAFMBE,
    ): Promise<boolean | void> {
        if (!data.rolls?.length) {
            const rolls = await TaskRoll.evaluate();
            this.parent.updateSource({ rolls });
        }
    }
}

interface TaskMessageDataModel extends TaskMessageDataSource {
    parent: TaskChatMessage;
}

export { TaskMessageDataModel };
