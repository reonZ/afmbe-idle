import {
    DatabaseCreateOperation,
    DatabaseUpdateOperation,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { documentSheetMixinAFMBE, DocumentSheetPartAFME } from "document-sheet";
import { ItemAFMBE } from "item";
import { enrichHTML, localize, render } from "utils";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends documentSheetMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    #showEffects: boolean = false;

    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        canCreate: false,
        classes: ["item"],
        position: { height: 460, width: 700 },
        actions: {
            toggleEffects: this.#toggleEffects,
        },
    };

    static PARTS: DocumentSheetPartAFME<ItemSheetPart, ItemSheetRenderContext> = {
        header: {
            template: "systems/afmbe-idle/templates/item/sheet-header.hbs",
        },
        description: {
            template: "systems/afmbe-idle/templates/item/sheet-description.hbs",
            prepareContext: this.prepareDescriptionContext,
        },
        effects: {
            template: "systems/afmbe-idle/templates/item/sheet-effects.hbs",
        },
    };

    static async prepareDescriptionContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.description = {
            enriched: await enrichHTML(this.item.system.description),
            value: this.item.system.description,
        };
    }

    static async #toggleEffects(this: ItemSheetAFMBE<ItemAFMBE>) {
        this.element.classList.toggle("show-active-effects", (this.#showEffects = !this.#showEffects));
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

        if (!this.item.system.isValidSubItem(item)) {
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

    async _renderFrame(options: ItemSheetRenderOptions): Promise<HTMLElement> {
        const frame = await super._renderFrame(options);
        const button = await render("systems/afmbe-idle/templates/item/header-buttons.hbs");
        const controls = frame.querySelector(`button[data-action="toggleControls"]`);

        controls?.insertAdjacentHTML("beforebegin", button);

        return frame;
    }

    async _onRender(context: ItemSheetRenderContext, options: ItemSheetRenderOptions): Promise<void> {
        await super._onRender(context, options);
        this.element.classList.toggle("show-active-effects", this.#showEffects);
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
