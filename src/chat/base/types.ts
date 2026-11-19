import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/client/data/fields.mjs";
import { ChatMessageSource } from "@7h3laughingman/foundry-types/common/documents/chat-message.mjs";
import type { BooleanField } from "fields";

type ChatMessageDataShema = {
    private: BooleanField;
};

type ChatMessageDataSource = ModelPropsFromSchema<ChatMessageDataShema>;

type ChatMessageSourceAFMBE = Omit<ChatMessageSource, "system"> & {
    system: ChatMessageDataSource;
};

export type { ChatMessageDataShema, ChatMessageDataSource, ChatMessageSourceAFMBE };
