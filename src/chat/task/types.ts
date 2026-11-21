import type {
    ArrayField,
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { CreatureModifierSchema, CreatureTaskCategory } from "actor";
import type { ChatMessageAFMBE, ChatMessageDataShema, ChatMessageSourceAFMBE, TaskMessageDataModel } from "chat";

type TaskMessageModifierSchema = Pick<CreatureModifierSchema, "label" | "origin" | "value">;

type TaskMessageDataSchema = ChatMessageDataShema & {
    category: StringField<CreatureTaskCategory, CreatureTaskCategory, true, false, false>;
    modifiers: ArrayField<SchemaField<TaskMessageModifierSchema>>;
    target: NumberField<number, number, false, true, false>;
};

type TaskMessageDataSource = ModelPropsFromSchema<TaskMessageDataSchema>;

type TaskMessageSource = ChatMessageSourceAFMBE<"task", TaskMessageDataSource>;

type TaskMessageContext = {
    header: string;
};

type PreCreateTaskMessageSource = DeepPartial<Omit<TaskMessageSource, "rolls" | "system" | "type">> & {
    system: TaskMessageDataSource;
    type: "task";
};

declare class TaskChatMessage extends ChatMessageAFMBE {
    system: TaskMessageDataModel;
}

export type {
    PreCreateTaskMessageSource,
    TaskChatMessage,
    TaskMessageContext,
    TaskMessageDataSchema,
    TaskMessageDataSource,
    TaskMessageSource,
};
