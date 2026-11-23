import { DatabaseCreateCallbackOptions } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { TEST_DIFFICULTIES } from "application";
import { PhysicalItem } from "item";
import { UserAFMBE } from "misc";
import * as R from "remeda";
import { ResolvedTaskRolls, TaskRoll } from "roll";
import { localize, render } from "utils";
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
                required: false,
                nullable: true,
                blank: false,
                initial: undefined,
                choices: [...TEST_DIFFICULTIES, "task"],
            }),
            origin: new fields.DocumentUUIDField({
                embedded: true,
                type: "Item",
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

    get classes(): string[] {
        return ["task"];
    }

    get isTask(): boolean {
        return this.category === "task";
    }

    get isTest(): boolean {
        return R.isIncludedIn(this.category, TEST_DIFFICULTIES);
    }

    get item(): PhysicalItem<ActorAFMBE> | null {
        const item = this.origin && fromUuidSync<PhysicalItem<ActorAFMBE>>(this.origin);
        return item?.isOfType("physical") ? item : null;
    }

    prepareContext(): TaskMessageContext {
        const resolved = this.resolveRolls();
        const header = this.isTest
            ? localize("afmbe.message.task.header.test", this.category ?? "")
            : localize("afmbe.message.task.header", this.category ?? "default");

        return {
            dice: { ...resolved, rolls: this.parent.rolls },
            header,
            modifiers: this.modifiers,
            result: resolved.value + R.sumBy(this.modifiers, R.prop("value")),
        };
    }

    async getContent(): Promise<string> {
        const context = this.prepareContext();
        return render("systems/afmbe-idle/templates/message/task.hbs", context);
    }

    resolveRolls(): ResolvedTaskRolls {
        return TaskRoll.resolveRolls(this.parent.rolls);
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
