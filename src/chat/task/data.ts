import { ChatMessageDataModel } from "chat";
import { TaskMessageDataSchema } from ".";

class TaskMessageDataModel extends ChatMessageDataModel<TaskMessageDataSchema> {
    getHTML(html: HTMLElement): Promise<HTMLElement> | HTMLElement {
        return html;
    }
}

export { TaskMessageDataModel };
