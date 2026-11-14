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
        },
    } satisfies ApplicationPartAFMBE<ItemSheetPart, ItemSheetRenderContext>;
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
