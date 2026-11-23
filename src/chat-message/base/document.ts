import type { UserAFMBE } from "misc";
import { ChatMessageDataModel, ChatMessageSourceAFMBE } from ".";

class ChatMessageAFMBE<TUser extends UserAFMBE | null = UserAFMBE | null> extends foundry.documents.ChatMessage<TUser> {
    async renderHTML(options: { canDelete?: boolean; canClose?: boolean } = {}): Promise<HTMLElement> {
        if (!(this.system instanceof ChatMessageDataModel)) {
            return super.renderHTML(options);
        }

        // little trickery so foundry doesn't render rolls
        const rolls = this.rolls;
        this.rolls = [];
        const html = await super.renderHTML(options);
        this.rolls = rolls;

        html.classList.add("afmbe", ...this.system.classes);

        const messageContent = html.querySelector(".message-content") as HTMLElement;
        const template = await this.system.getContent();

        messageContent.insertAdjacentHTML("beforeend", template);
        this.system.attachListeners(messageContent);

        return html;
    }
}

interface ChatMessageAFMBE {
    _source: ChatMessageSourceAFMBE;
}

export { ChatMessageAFMBE };
