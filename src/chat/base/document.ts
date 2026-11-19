import type { UserAFMBE } from "misc";
import { ChatMessageDataModel, ChatMessageSourceAFMBE } from ".";

class ChatMessageAFMBE<TUser extends UserAFMBE | null = UserAFMBE | null> extends foundry.documents.ChatMessage<TUser> {
    async renderHTML(options?: { canDelete?: boolean; canClose?: boolean } | undefined): Promise<HTMLElement> {
        const html = await super.renderHTML(options);

        if (this.system instanceof ChatMessageDataModel) {
            return this.system.getHTML(html);
        }

        return html;
    }
}

interface ChatMessageAFMBE {
    _source: ChatMessageSourceAFMBE;
}

export { ChatMessageAFMBE };
