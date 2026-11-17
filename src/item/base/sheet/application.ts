import {
    DatabaseCreateOperation,
    DatabaseUpdateOperation,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { enrichHTML } from "utils";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        canCreate: false,
        classes: ["item"],
        position: { height: 500, width: 650 },
    };

    static PARTS = {
        ...super.PARTS,
        description: {
            template: "systems/afmbe-idle/templates/item/description.hbs",
            prepareContext: this.prepareDescriptionContext,
        },
    } satisfies ApplicationPartAFMBE<ItemSheetPart, ItemSheetRenderContext>;

    static async prepareDescriptionContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.description = {
            enriched: await enrichHTML(this.item.system.description),
            value: this.item.system.description,
        };
    }

    async _prepareContext(options: ItemSheetRenderOptions): Promise<ItemSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ItemSheetRenderContext;
        context.actor = this.item.actor;
        context.isOwned = !!this.item.actor;
        context.item = this.item;
        return context;
    }

    async _processSubmitData(
        _event: SubmitEvent,
        _form: HTMLFormElement,
        submitData: Record<string, unknown>,
        options?:
            Partial<DatabaseCreateOperation<ActorAFMBE | null>> | Partial<DatabaseUpdateOperation<ActorAFMBE | null>>,
    ): Promise<any> {
        const updated = await this.document.update(
            submitData,
            options as DatabaseUpdateOperation<ActorAFMBE | ItemAFMBE | null>,
        );
        return updated ? { updated } : {};
    }
}

interface ItemSheetAFMBE<TParent extends ItemAFMBE> {
    get actor(): TParent["actor"];
    get item(): TParent;
}

export { ItemSheetAFMBE };
