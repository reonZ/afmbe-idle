import { ItemAFMBE } from "item";
import { ItemSheetConfiguration, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE> extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        classes: ["afmbe", "item"],
        form: {
            submitOnChange: true,
        },
        actions: {},
    };

    async _prepareContext(options: ItemSheetRenderOptions): Promise<ItemSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ItemSheetRenderContext;
        return context;
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
