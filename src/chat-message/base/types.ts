import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import { ChatMessageSource } from "@7h3laughingman/foundry-types/common/documents/chat-message.mjs";

type ChatMessageDataShema = {};

type ChatMessageDataSource = ModelPropsFromSchema<ChatMessageDataShema>;

type ChatMessageSourceAFMBE<
    TType extends string = string,
    TSystem extends ChatMessageDataSource = ChatMessageDataSource,
> = Omit<ChatMessageSource, "system" | "type"> & {
    system: TSystem;
    type: TType;
};

export type { ChatMessageDataShema, ChatMessageDataSource, ChatMessageSourceAFMBE };
