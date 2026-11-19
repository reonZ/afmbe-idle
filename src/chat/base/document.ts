import { ChatMessageCreateOperation } from "@7h3laughingman/foundry-types/client/documents/chat-message.mjs";
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

    protected override _preCreate(
        data: DeepPartial<this["_source"]>,
        options: ChatMessageCreateOperation,
        user: UserAFMBE,
    ): Promise<boolean | void> {
        if (data.system?.private === true) {
            options.messageMode = "blind";
        }
        return super._preCreate(data, options, user);
    }
}

interface ChatMessageAFMBE {
    _source: ChatMessageSourceAFMBE;
}

export { ChatMessageAFMBE };
