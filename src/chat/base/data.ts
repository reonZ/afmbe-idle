import type { ChatMessageAFMBE, ChatMessageDataShema } from ".";

abstract class ChatMessageDataModel<TSchema extends ChatMessageDataShema> extends foundry.abstract.TypeDataModel<
    ChatMessageAFMBE | null,
    TSchema
> {
    static defineSchema(): ChatMessageDataShema {
        return {};
    }

    abstract getHTML(html: HTMLElement): Promise<HTMLElement> | HTMLElement;
}

interface ChatMessageDataModel<TSchema extends ChatMessageDataShema> {
    readonly parent: ChatMessageAFMBE;
}

export { ChatMessageDataModel };
