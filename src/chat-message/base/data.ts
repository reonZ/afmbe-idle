import type { ChatMessageAFMBE, ChatMessageDataShema } from ".";

abstract class ChatMessageDataModel<TSchema extends ChatMessageDataShema> extends foundry.abstract.TypeDataModel<
    ChatMessageAFMBE | null,
    TSchema
> {
    static defineSchema(): ChatMessageDataShema {
        return {};
    }

    get classes(): string[] {
        return [];
    }

    abstract get template(): string;

    abstract prepareContext(): Promise<Record<string, any>>;
}

interface ChatMessageDataModel<TSchema extends ChatMessageDataShema> {
    readonly parent: ChatMessageAFMBE;
}

export { ChatMessageDataModel };
