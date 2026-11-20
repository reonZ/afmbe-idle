import { render } from "utils";
import type { ChatMessageAFMBE, ChatMessageDataShema } from ".";

abstract class ChatMessageDataModel<TSchema extends ChatMessageDataShema> extends foundry.abstract.TypeDataModel<
    ChatMessageAFMBE | null,
    TSchema
> {
    static defineSchema(): ChatMessageDataShema {
        return {};
    }

    abstract get template(): string;

    abstract prepareContext(): Promise<Record<string, any>>;

    async getHTML(html: HTMLElement): Promise<HTMLElement> {
        const context = await this.prepareContext();
        const template = await render(this.template, context);
        const content = html.querySelector(".message-content") as HTMLElement;

        content.insertAdjacentHTML("afterbegin", template);
        return html;
    }
}

interface ChatMessageDataModel<TSchema extends ChatMessageDataShema> {
    readonly parent: ChatMessageAFMBE;
}

export { ChatMessageDataModel };
