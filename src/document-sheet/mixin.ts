import DocumentSheetV2, {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
} from "@7h3laughingman/foundry-types/client/applications/api/document-sheet.mjs";
import { HandlebarsRenderOptions } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import { ContextMenuEntry } from "@7h3laughingman/foundry-types/client/applications/ux/context-menu.mjs";
import { ActorAFMBE } from "actor";
import { ItemAFMBE } from "item";
import { DocumentSheetStaticAFMBE } from ".";

function documentSheetMixinAFMBE<TBase extends AbstractConstructorOf<DocumentSheetV2<any>>>(
    BaseApplication: TBase,
): DocumentSheetStaticAFMBE & TBase {
    abstract class HandlebarsApplicationAFMBE extends foundry.applications.api.HandlebarsApplicationMixin(
        BaseApplication,
    ) {
        static DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration> = {
            classes: ["afmbe"],
            form: { submitOnChange: true },
            actions: {
                "delete-item": this.#deleteItem,
                "open-item-sheet": this.#openItemSheet,
            },
        };

        static async #deleteItem(this: HandlebarsApplicationAFMBE, _event: PointerEvent, target: HTMLElement) {
            const item = await this.getItemFromTargetElement(target);
            item?.confirmDelete();
        }

        static async #openItemSheet(this: HandlebarsApplicationAFMBE, _event: PointerEvent, target: HTMLElement) {
            const item = await this.getItemFromTargetElement(target);
            item?.sheet.render(true);
        }

        async _preparePartContext(
            partId: string,
            context: DocumentSheetRenderContext,
            options: HandlebarsRenderOptions,
        ): Promise<DocumentSheetRenderContext> {
            super._preparePartContext(partId, context, options);
            const cls = this.constructor as DocumentSheetStaticAFMBE;
            const part = cls.PARTS[partId];

            await part?.prepareContext?.call(this, context, options);
            return context;
        }

        _attachPartListeners(partId: string, html: HTMLElement, options: HandlebarsRenderOptions) {
            super._attachPartListeners(partId, html, options);
            const cls = this.constructor as DocumentSheetStaticAFMBE;
            const part = cls.PARTS[partId];
            part?.activateListeners?.call(this, html, options);
        }

        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions) {
            super._replaceHTML(result, content, options);
            content.dataset.tooltipClass = "afmbe";
            content.dataset.tooltipDirection = "UP";
            this._attachListeners(content);
        }

        _attachListeners(html: HTMLElement) {
            const inputs = html.querySelectorAll<HTMLInputElement>(`input[type="number"], input[type="text"]`);

            for (const el of inputs) {
                el.addEventListener(
                    "keydown",
                    (event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            event.stopPropagation();
                            el.blur();
                        }
                    },
                    { capture: true },
                );
            }
        }

        async _onFirstRender(context: object, options: HandlebarsRenderOptions): Promise<void> {
            await super._onFirstRender(context, options);

            this._createContextMenu(this.getItemContextOptions, "[data-item-id]", {
                hookName: "get{}ItemContextOptions",
                parentClassHooks: false,
            });
        }

        getItemContextOptions(this: HandlebarsApplicationAFMBE & { isEditable: boolean }): ContextMenuEntry[] {
            const isEditable = this.isEditable;

            return [
                {
                    icon: "fa-solid fa-pen-to-square",
                    label: "afmbe.actor.contextMenu.item.edit",
                    onClick: async (event, target) => {
                        const item = await this.getItemFromTargetElement(target);
                        item?.sheet.render(true);
                    },
                },
                {
                    icon: "fa-solid fa-trash",
                    label: "afmbe.actor.contextMenu.item.delete",
                    visible: isEditable,
                    onClick: async (event, target) => {
                        const item = await this.getItemFromTargetElement(target);
                        item?.confirmDelete();
                    },
                },
            ];
        }

        get rootParent(): ActorAFMBE | ItemAFMBE {
            const document = this.document as ActorAFMBE | ItemAFMBE;
            return document instanceof ActorAFMBE ? document : (document.actor ?? document.rootParentItem ?? document);
        }

        async getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null> {
            const parent = this.rootParent;
            const id = target.closest<HTMLElement>("[data-item-id]")?.dataset.itemId ?? "";
            const item = parent instanceof ActorAFMBE ? parent.items.get(id) : parent.subItems.get(id);

            return item instanceof ItemAFMBE ? item : null;
        }
    }

    return HandlebarsApplicationAFMBE as unknown as DocumentSheetStaticAFMBE & TBase;
}

export { documentSheetMixinAFMBE };
