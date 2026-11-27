import { ApplicationTabsConfiguration } from "@7h3laughingman/foundry-types/client/applications/_types.mjs";
import FormDataExtended from "@7h3laughingman/foundry-types/client/applications/ux/form-data-extended.mjs";
import {
    DatabaseCreateOperation,
    DatabaseUpdateOperation,
} from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";
import { ActorAFMBE } from "actor";
import { documentSheetMixinAFMBE, DocumentSheetPartAFME } from "document-sheet";
import { ItemAFMBE } from "item";
import * as R from "remeda";
import { enrichHTML, localize, render } from "utils";
import { ItemSheetConfiguration, ItemSheetPart, ItemSheetRenderContext, ItemSheetRenderOptions } from ".";

abstract class ItemSheetAFMBE<TParent extends ItemAFMBE = ItemAFMBE> extends documentSheetMixinAFMBE(
    foundry.applications.sheets.ItemSheetV2<ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ItemSheetConfiguration> = {
        canCreate: false,
        classes: ["item"],
        position: { height: 520, width: 700 },
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
            prepareContext: this.prepareEffectsContext,
        },
        tabs: {
            template: "templates/generic/tab-navigation.hbs",
        },
    };

    static TABS: Record<string, ApplicationTabsConfiguration> = {
        sheet: {
            initial: "description",
            labelPrefix: "afmbe.item.navigation",
            tabs: [
                { id: "description", icon: "fa-solid fa-file-lines", tooltip: "afmbe.item.navigation.description" },
                { id: "effects", icon: "fa-solid fa-person-rays" },
            ],
        },
    };

    static ACTIVE_EFFECTS: Record<string, { template: string }> = {
        "system.modifiers": {
            template: "systems/afmbe-idle/templates/effect/add-modifier.hbs",
        },
    };

    static async prepareDescriptionContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.description = {
            enriched: await enrichHTML(this.item.system.description),
            value: this.item.system.description,
        };
    }

    static async prepareEffectsContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        const effectsPromise = R.map(this.item.effects.contents, async (effect) => {
            if (!("changes" in effect.system) || !R.isArray(effect.system.changes)) return [];

            const changes = R.map(effect.system.changes, async (data, index) => {
                if (!R.isObjectType(data) || !("key" in data) || !R.isString(data.key)) return;

                const template = ItemSheetAFMBE.ACTIVE_EFFECTS[data.key]?.template;
                if (!template) return;

                console.log(template, { ...data, rootId: `${effect.id}-${index}` });
                const content = await render(template, { ...data, rootId: `${effect.id}-${index}` });
                return render("systems/afmbe-idle/templates/effect/form.hbs", { content, id: effect.id, index });
            });

            return R.filter(await Promise.all(changes), R.isTruthy);
        });

        const effects = (await Promise.all(effectsPromise)).flat();

        console.log(effects);
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

    async _prepareContext(options: ItemSheetRenderOptions): Promise<ItemSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ItemSheetRenderContext;
        context.actor = this.item.actor;
        context.isOwned = !!this.item.actor;
        context.item = this.item;
        return context;
    }

    protected _processFormData(
        event: SubmitEvent | null,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ): Record<string, unknown> {
        console.log(arguments);
        return super._processFormData(event, form, formData);
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
