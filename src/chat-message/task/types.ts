import type {
    ArrayField,
    DocumentUUIDField,
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { CreatureModifierSchema } from "actor";
import type { TestDifficulty } from "application";
import type { ChatMessageAFMBE, ChatMessageDataShema, ChatMessageSourceAFMBE } from "chat-message";
import type { EvaluatedTaskRolls, ResolvedTaskRolls } from "roll";
import type { TaskMessageDataModel } from ".";

type TaskMessageModifierSchema = Pick<CreatureModifierSchema, "label" | "origin" | "value">;

type TaskMessageModifier = ModelPropsFromSchema<TaskMessageModifierSchema>;

type TaskMessageCategory = TestDifficulty | "task";

type TaskMessageDataSchema = ChatMessageDataShema & {
    category: StringField<TaskMessageCategory, TaskMessageCategory, false, true, true>;
    origin: DocumentUUIDField;
    modifiers: ArrayField<SchemaField<TaskMessageModifierSchema>>;
    target: NumberField<number, number, false, true, false>;
};

type TaskMessageDataSource = ModelPropsFromSchema<TaskMessageDataSchema>;

type TaskMessageSource = ChatMessageSourceAFMBE<"task", TaskMessageDataSource>;

type TaskMessageContext = {
    dice: ResolvedTaskRolls & { rolls: EvaluatedTaskRolls };
    header: string;
    modifiers: TaskMessageModifier[];
    result: number;
};

type PreCreateTaskMessageSource = DeepPartial<Omit<TaskMessageSource, "rolls" | "system" | "type">> & {
    system: TaskMessageDataSource;
    type: "task";
};

declare class TaskChatMessage extends ChatMessageAFMBE {
    system: TaskMessageDataModel;
    rolls: EvaluatedTaskRolls;
}

export type {
    PreCreateTaskMessageSource,
    TaskChatMessage,
    TaskMessageContext,
    TaskMessageDataSchema,
    TaskMessageDataSource,
    TaskMessageSource,
};
