import { DatabaseCreateCallbackOptions } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { CREATURE_TASK_CATEGORIES, RollTaskApplication } from "actor";
import { ChatMessageDataModel } from "chat";
import { UserAFMBE } from "misc";
import { localize } from "utils";
import {
    TaskChatMessage,
    TaskMessageContext,
    TaskMessageDataSchema,
    TaskMessageDataSource,
    TaskMessageSource,
} from ".";
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

    get template(): string {
        return "systems/afmbe-idle/templates/message/task.hbs";
    }

    async prepareContext(): Promise<TaskMessageContext> {
        const header = localize("afmbe.actor.creature.task.roll", this.category);
        return { header };
    }

    async _preCreate(
        data: DeepPartial<TaskMessageSource>,
        _options: DatabaseCreateCallbackOptions,
        _user: UserAFMBE,
    ): Promise<boolean | void> {
        const updates: Record<string, any> = {};

        if (!data.sound) {
            updates.sound = CONFIG.sounds.dice;
        }

        if (!data.rolls?.length) {
            updates.rolls = await RollTaskApplication.rollTaskDice();
        }

        this.parent.updateSource(updates);
    }
}

interface TaskMessageDataModel extends TaskMessageDataSource {
    parent: TaskChatMessage;
}

export { TaskMessageDataModel };
