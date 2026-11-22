import type { UserAFMBE } from "misc";
import { render } from "utils";
import { ChatMessageDataModel, ChatMessageSourceAFMBE } from ".";

class ChatMessageAFMBE<TUser extends UserAFMBE | null = UserAFMBE | null> extends foundry.documents.ChatMessage<TUser> {
    async renderHTML(options: { canDelete?: boolean; canClose?: boolean } = {}): Promise<HTMLElement> {
        if (!(this.system instanceof ChatMessageDataModel)) {
            return super.renderHTML(options);
        }

        // little trickery so foundry doesn't render rolls for nothing
        const rolls = this.rolls;
        this.rolls = [];

        const html = await super.renderHTML(options);
        this.rolls = rolls;

        const context = await this.system.prepareContext();
        const template = await render(this.system.template, context);
        const content = html.querySelector(".message-content") as HTMLElement;

        content.insertAdjacentHTML("beforeend", template);
        html.classList.add("afmbe", ...this.system.classes);

        return html;
    }
}

interface ChatMessageAFMBE {
    _source: ChatMessageSourceAFMBE;
}

export { ChatMessageAFMBE };
