import type { ChatMessageAFMBE, ChatMessageDataShema } from ".";
import { BooleanField } from "fields";

abstract class ChatMessageDataModel<TSchema extends ChatMessageDataShema> extends foundry.abstract.TypeDataModel<
    ChatMessageAFMBE | null,
    TSchema
> {
    static defineSchema(): ChatMessageDataShema {
        return {
            private: new BooleanField(),
        };
    }

    abstract getHTML(html: HTMLElement): Promise<HTMLElement> | HTMLElement;
}

interface ChatMessageDataModel<TSchema extends ChatMessageDataShema> {
    readonly parent: ChatMessageAFMBE;
}

export { ChatMessageDataModel };
