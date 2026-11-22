import { documentSheetMixinAFMBE } from "document-sheet";
import { ItemAFMBE } from "item";
import * as R from "remeda";
import { localize } from "utils";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "..";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends documentSheetMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { height: 500, width: 550 },
        actions: {
            "add-item": this.#addItem,
        },
    };

    static async #addItem(this: ActorSheetAFMBE, _event: PointerEvent, target: HTMLElement) {
        const type = target.dataset.itemType;
        if (!ItemAFMBE.isItemType(type)) return;

        const name = localize("TYPES.Item", type);
        const [item] = await this.actor.createEmbeddedDocuments("Item", [{ name, type }]);
        item?.sheet.render(true);
    }

    async _prepareContext(options: ActorSheetRenderOptions): Promise<ActorSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ActorSheetRenderContext;
        context.actor = this.actor;
        return context;
    }

    async _onDropItem(event: DragEvent, item: ItemAFMBE): Promise<Maybe<ItemAFMBE>> {
        if (!R.isIncludedIn(item.type, this.actor.system.allowedItems)) {
            ui.notifications.error("afmbe.actor.allowedItems.error", {
                format: { type: localize("TYPES.Item", item.type) },
            });
            return;
        }
        return super._onDropItem(event, item);
    }

    async _attachListeners(html: HTMLElement) {
        super._attachListeners(html);

        const addItemElements = html.querySelectorAll<HTMLElement>(`[data-action="add-item"]`);

        for (const el of addItemElements) {
            const type = el.dataset.itemType;
            if (!ItemAFMBE.isItemType(type)) continue;

            const name = localize("TYPES.Item", type);
            el.dataset.tooltip = localize("afmbe.actor.addItem.tooltip", { name });
        }
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
