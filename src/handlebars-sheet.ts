import {
    ApplicationV2,
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    HandlebarsApplication,
    HandlebarsApplicationStatic,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@7h3laughingman/foundry-types/client/applications/api/_module.mjs";
import { ContextMenuEntry } from "@7h3laughingman/foundry-types/client/applications/ux/context-menu.mjs";
import { ItemAFMBE } from "item";

function documentSheetMixinAFMBE<
    TBase extends AbstractConstructorOf<ApplicationV2<any>>,
    TPart extends "header" | (string & {}),
    TContext extends DocumentSheetRenderContext,
>(BaseApplication: TBase): DocumentSheetStaticAFMBE<TPart, TContext> & TBase {
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

        static async getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null> {
            const uuid = target.closest<HTMLElement>("[data-item-uuid]")?.dataset.itemUuid;
            const item = await fromUuid(uuid ?? "");
            return item instanceof ItemAFMBE ? item : null;
        }

        static async #deleteItem(_event: PointerEvent, target: HTMLElement) {
            const item = await HandlebarsApplicationAFMBE.getItemFromTargetElement(target);
            item?.confirmDelete();
        }

        static async #openItemSheet(_event: PointerEvent, target: HTMLElement) {
            const item = await HandlebarsApplicationAFMBE.getItemFromTargetElement(target);
            item?.sheet.render(true);
        }

        async _preparePartContext(
            this: HandlebarsApplication,
            partId: TPart,
            context: TContext,
            options: HandlebarsRenderOptions,
        ): Promise<TContext> {
            super._preparePartContext(partId, context, options);
            const cls = this.constructor as DocumentSheetStaticAFMBE<TPart, TContext>;
            const part = cls.PARTS[partId];

            await part?.prepareContext?.call(this, context, options);
            return context;
        }

        _attachPartListeners(
            this: HandlebarsApplication,
            partId: TPart,
            html: HTMLElement,
            options: HandlebarsRenderOptions,
        ) {
            super._attachPartListeners(partId, html, options);
            const cls = this.constructor as DocumentSheetStaticAFMBE<TPart, TContext>;
            const part = cls.PARTS[partId];
            part?.activateListeners?.call(this, html, options);
        }

        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions) {
            super._replaceHTML(result, content, options);
            content.dataset.tooltipDirection = "UP";
            content.dataset.tooltipClass = "afmbe";
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

            this._createContextMenu(this.getItemContextOptions, "[data-item-uuid]", {
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

        getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null> {
            return (this.constructor as typeof HandlebarsApplicationAFMBE).getItemFromTargetElement(target);
        }
    }

    return HandlebarsApplicationAFMBE as unknown as DocumentSheetStaticAFMBE<TPart, TContext> & TBase;
}

interface DocumentSheetAFMBE extends HandlebarsApplication {
    _attachListeners(html: HTMLElement): void | Promise<void>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

interface DocumentSheetStaticAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext>
    extends ConstructorOf<DocumentSheetAFMBE>, HandlebarsApplicationStatic {
    PARTS: DocumentSheetPartAFME<TPart, TContext>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

type DocumentSheetPartAFME<TPart extends string, TContext extends DocumentSheetRenderContext> = Record<
    TPart,
    HandlebarsTemplatePart & {
        activateListeners?: (html: HTMLElement, options: HandlebarsRenderOptions) => void | Promise<void>;
        prepareContext?: (context: TContext, options: HandlebarsRenderOptions) => Promise<void> | void;
    }
>;

export { documentSheetMixinAFMBE };
export type { DocumentSheetPartAFME };
