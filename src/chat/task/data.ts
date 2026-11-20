import { DatabaseCreateCallbackOptions } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { CREATURE_MODIFIER_TYPES, CREATURE_TASK_CATEGORIES, CreatureAttributes } from "actor";
import { ChatMessageDataModel } from "chat";
import { PositiveIntegerField } from "fields";
import { ItemAFMBE } from "item";
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
            die: new PositiveIntegerField({ min: 1 }),
            modifiers: new fields.ArrayField(
                new fields.SchemaField({
                    id: new fields.StringField({
                        required: true,
                        nullable: false,
                        blank: false,
                    }),
                    label: new fields.StringField({
                        required: true,
                        nullable: false,
                        blank: false,
                    }),
                    type: new fields.StringField({
                        required: true,
                        nullable: false,
                        blank: false,
                        initial: "all",
                        choices: CREATURE_MODIFIER_TYPES,
                    }),
                    value: new fields.NumberField({
                        required: true,
                        nullable: false,
                        integer: true,
                    }),
                }),
            ),
            origin: new fields.StringField({
                required: false,
                nullable: true,
                initial: undefined,
            }),
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

    async getOriginName(): Promise<string> {
        if (!this.origin) {
            return "";
        }

        if (CreatureAttributes.isAttributeType(this.origin)) {
            return CreatureAttributes.getLabel(this.origin);
        }

        const origin = await fromUuid(this.origin);
        return (origin instanceof ItemAFMBE && origin.name) || "";
    }

    async prepareContext(): Promise<TaskMessageContext> {
        const header = localize("afmbe.actor.creature.task.roll", this.category, { name: await this.getOriginName() });
        return { header };
    }

    async _preCreate(
        data: DeepPartial<TaskMessageSource>,
        options: DatabaseCreateCallbackOptions,
        user: UserAFMBE,
    ): Promise<boolean | void> {
        const updates: DeepPartial<TaskMessageSource> = {
            sound: CONFIG.sounds.dice,
        };

        if (!data.system?.die) {
            const roll = new Roll("1d10").evaluateSync();
            updates.system = {
                die: roll.total,
            };
        }

        this.parent.updateSource(updates);
    }
}

interface TaskMessageDataModel extends TaskMessageDataSource {
    parent: TaskChatMessage;
}

export { TaskMessageDataModel };
