import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import type { ChatMessageDataShema } from "chat";

type TaskMessageDataSchema = ChatMessageDataShema;

type TaskMessageDataSource = ModelPropsFromSchema<TaskMessageDataSchema>;

export type { TaskMessageDataSchema, TaskMessageDataSource };
