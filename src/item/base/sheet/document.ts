import { ItemAFMBE } from "item";
import { ItemParts, ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext } from ".";

abstract class ItemSheetAFMBE<
    TParent extends ItemAFMBE = ItemAFMBE,
> extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2<ItemAFMBE>) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        classes: ["afmbe", "item"],
        form: {
            submitOnChange: true,
        },
        actions: {},
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/item/header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
    } satisfies ItemParts<ItemSheetPart, ItemSheetRenderContext>;

    static prepareHeaderContext<T extends ItemSheetRenderContext>(this: ItemSheetAFMBE, context: T): T {
        context.name = this.item.name;
        return context;
    }

    async _preparePartContext(partId: ItemSheetPart, context: ItemSheetRenderContext): Promise<ItemSheetRenderContext> {
        const part = (this.constructor as typeof ItemSheetAFMBE).PARTS[partId];
        return part?.prepareContext.call(this, context) ?? context;
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
