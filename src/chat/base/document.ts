import type { UserAFMBE } from "misc";
import { render } from "utils";
import { ChatMessageDataModel, ChatMessageSourceAFMBE } from ".";

class ChatMessageAFMBE<TUser extends UserAFMBE | null = UserAFMBE | null> extends foundry.documents.ChatMessage<TUser> {
    async renderHTML(options: { canDelete?: boolean; canClose?: boolean } = {}): Promise<HTMLElement> {
        const html = await super.renderHTML(options);

        if (!(this.system instanceof ChatMessageDataModel)) {
            return html;
        }

        const context = await this.system.prepareContext();
        const template = await render(this.system.template, context);
        const content = html.querySelector(".message-content") as HTMLElement;

        content.insertAdjacentHTML("afterbegin", template);

        return html;
    }
}

interface ChatMessageAFMBE {
    _source: ChatMessageSourceAFMBE;
}

export { ChatMessageAFMBE };
