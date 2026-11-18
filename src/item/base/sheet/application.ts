import { HandlebarsRenderOptions } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import {
    DatabaseCreateOperation,
    DatabaseUpdateOperation,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { documentSheetMixinAFMBE, DocumentSheetPartAFME } from "handlebars-sheet";
import { ItemAFMBE } from "item";
import * as R from "remeda";
import { enrichHTML, localize } from "utils";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends documentSheetMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        canCreate: false,
        classes: ["item"],
        position: { height: 500, width: 650 },
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/item/sheet-header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
        description: {
            template: "systems/afmbe-idle/templates/item/description.hbs",
            prepareContext: this.prepareDescriptionContext,
        },
    } satisfies DocumentSheetPartAFME<ItemSheetPart, ItemSheetRenderContext>;

    static prepareHeaderContext(
        this: ItemSheetAFMBE,
        context: ItemSheetRenderContext,
        _options: HandlebarsRenderOptions,
    ) {
        context.name = this.item.name;
        context.img = this.item.img ?? this.item.defaultArtwork.img;
    }

    static async prepareDescriptionContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.description = {
            enriched: await enrichHTML(this.item.system.description),
            value: this.item.system.description,
        };
    }

    async _onDropDocument<TDocument extends foundry.abstract.Document>(
        event: DragEvent,
        document: TDocument,
    ): Promise<TDocument | null> {
        if (document instanceof ItemAFMBE) {
            return (await this._onDropItem(event, document)) ?? null;
        }
        return super._onDropDocument(event, document);
    }

    async _onDropItem<T extends ItemAFMBE<null>>(_event: DragEvent, item: T): Promise<T | undefined> {
        if (!this.item.isOwner) return;

        if (!R.isIncludedIn(item.type, this.item.system.allowedSubItems)) {
            ui.notifications.error("afmbe.item.allowedSubItems.error", {
                format: { type: localize("TYPES.Item", item.type) },
            });
            return;
        }

        if (this.item.id === item.parentItem?.id) {
            // const result = await this._onSortItem(event, item);
            // return result?.length ? item : null;
            return;
        }

        const keepId = !this.item.subItems.has(item.id);
        const data = item.inCompendium
            ? game.items.fromCompendium(item, { clearFolder: true, keepId })
            : item.toObject();

        const [result] = await this.item.createEmbeddedDocuments("Item", [data], { keepId });
        return result as T | undefined;
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
