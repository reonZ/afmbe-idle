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
import { configToSelectOptions, enrichHTML, localize } from "utils";
import {
    ItemSheetConfiguration,
    ItemSheetEffect,
    ItemSheetPart,
    ItemSheetRenderContext,
    ItemSheetRenderOptions,
} from ".";

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

    static ACTIVE_EFFECTS: Record<string, { data?: () => Record<string, any>; template: string }> = {
        "system.modifiers": {
            data: () => {
                return { options: configToSelectOptions(CONFIG.AFMBE.ACTOR.CREATURE.MODIFIER.AFFECTS) };
            },
            template: "systems/afmbe-idle/templates/effect/add-modifier.hbs",
        },
    };

    static ACTIVE_EFFECTS_TEMPLATES = R.pipe(
        this.ACTIVE_EFFECTS,
        R.values(),
        R.map((effect) => effect.template),
        R.unique(),
    );

    static async prepareDescriptionContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.description = {
            enriched: await enrichHTML(this.item.system.description),
            value: this.item.system.description,
        };
    }

    static async prepareEffectsContext(this: ItemSheetAFMBE, context: ItemSheetRenderContext) {
        context.effects = R.flatMap(this.item.effects.contents, (effect) => {
            return R.pipe(
                effect.changes,
                R.map((change, index): ItemSheetEffect | undefined => {
                    if (!R.isString(change.key)) return;

                    const options = ItemSheetAFMBE.ACTIVE_EFFECTS[change.key];
                    if (!options) return;

                    const id = effect.id;
                    const data = options.data?.() ?? {};
                    const rootId = `${id}-${index}`;
                    const rootName = `ActiveEffect.${id}.${index}`;

                    return { data, id, index, rootId, rootName, template: options.template, value: change.value };
                }),
                R.filter(R.isTruthy),
            );
        });
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

    async _preFirstRender(context: Record<string, unknown>, options: ItemSheetRenderOptions): Promise<void> {
        await super._preFirstRender(context, options);
        await foundry.applications.handlebars.loadTemplates(ItemSheetAFMBE.ACTIVE_EFFECTS_TEMPLATES);
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
