import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

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
            prepareContext: this.prepareHeaderTemplate,
        },
    } satisfies ApplicationPartAFMBE<ItemSheetPart, ItemSheetRenderContext>;

    static prepareHeaderTemplate<T extends ItemSheetRenderContext>(this: ItemSheetAFMBE, context: T): T {
        context.name = this.item.name;
        return context;
    }

    async _prepareContext(options: ItemSheetRenderOptions): Promise<ItemSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ItemSheetRenderContext;

        context.actor = this.item.actor;
        context.isOwned = !!this.item.actor;

        return context;
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
