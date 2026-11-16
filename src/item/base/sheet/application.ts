import { applicationMixinAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ItemSheetConfiguration, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        classes: ["item"],
        position: { width: 480 },
    };

    async _prepareContext(options: ItemSheetRenderOptions): Promise<ItemSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ItemSheetRenderContext;
        context.actor = this.item.actor;
        context.isOwned = !!this.item.actor;
        context.item = this.item;
        return context;
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
