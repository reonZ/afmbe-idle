import { CREATURE_MODIFIER_TYPES, CREATURE_TASK_CATEGORIES, CreatureAttributes } from "actor";
import { ChatMessageDataModel } from "chat";
import { localize } from "utils";
import { TaskMessageContext, TaskMessageDataSchema, TaskMessageDataSource } from ".";
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

    async prepareContext(): Promise<TaskMessageContext> {
        const header = CreatureAttributes.isAttributeType(this.origin)
            ? CreatureAttributes.getLabel(this.origin)
            : localize("afmbe.actor.creature.task.roll", this.category, { name: this.origin });

        return { header };
    }
}

interface TaskMessageDataModel extends TaskMessageDataSource {}

export { TaskMessageDataModel };
