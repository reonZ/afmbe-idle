import type {
    ArrayField,
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";
import type { CreatureModifierSchema, CreatureTaskCategory } from "actor";
import type { ChatMessageDataShema, ChatMessageSourceAFMBE } from "chat";

type TaskMessageDataSchema = ChatMessageDataShema & {
    category: StringField<CreatureTaskCategory, CreatureTaskCategory, true, false, false>;
    modifiers: ArrayField<SchemaField<CreatureModifierSchema>>;
    origin: StringField<string, string, false, true, false>;
    target: NumberField<number, number, false, true, false>;
};

type TaskMessageDataSource = ModelPropsFromSchema<TaskMessageDataSchema>;

type TaskMessageSource = ChatMessageSourceAFMBE<"task", TaskMessageDataSource>;

type PreCreateTaskMessageSource = DeepPartial<Omit<TaskMessageSource, "rolls" | "system" | "type">> &
    Pick<TaskMessageSource, "system" | "type"> & {
        rolls: [string | Rolled<Roll>];
    };

export type { PreCreateTaskMessageSource, TaskMessageDataSchema, TaskMessageDataSource };
