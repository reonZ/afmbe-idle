import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        classes: ["item"],
        position: { width: 480 },
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/item/header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
    } satisfies ApplicationPartAFMBE<ItemSheetPart, ItemSheetRenderContext>;

    static prepareHeaderContext<T extends ItemSheetRenderContext>(this: ItemSheetAFMBE, context: T): T {
        context.name = this.item.name;
        return context;
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
