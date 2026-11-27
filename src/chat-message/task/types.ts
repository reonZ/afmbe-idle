import type {
    ArrayField,
    DocumentUUIDField,
    ModelPropsFromSchema,
    SchemaField,
    SourceFromSchema,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { CreatureModifierSchema } from "actor";
import type { TestDifficulty } from "application";
import type { ChatMessageAFMBE, ChatMessageDataShema, ChatMessageSourceAFMBE } from "chat-message";
import type { EvaluatedTaskRolls, ResolvedTaskRolls, TaskTarget, TaskTargetSchema } from "roll";
import type { TaskMessageDataModel } from ".";

type TaskMessageModifierSchema = Pick<CreatureModifierSchema, "label" | "origin" | "value">;

type TaskMessageModifier = ModelPropsFromSchema<TaskMessageModifierSchema>;

type TaskMessageCategory = TestDifficulty | "task";

type TaskMessageDataSchema = ChatMessageDataShema & {
    category: StringField<TaskMessageCategory, TaskMessageCategory, false, true, true>;
    origin: DocumentUUIDField;
    modifiers: ArrayField<SchemaField<TaskMessageModifierSchema>>;
    target: SchemaField<TaskTargetSchema, SourceFromSchema<TaskTargetSchema>, Partial<TaskTarget>, false, true, true>;
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

declare class TaskChatMessageAFMBE extends ChatMessageAFMBE {
    system: TaskMessageDataModel;
    rolls: EvaluatedTaskRolls;
}

export type {
    PreCreateTaskMessageSource,
    TaskChatMessageAFMBE,
    TaskMessageContext,
    TaskMessageDataSchema,
    TaskMessageDataSource,
    TaskMessageSource,
};
