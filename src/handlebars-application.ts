import {
    ApplicationV2,
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    HandlebarsApplication,
    HandlebarsApplicationStatic,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@7h3laughingman/foundry-types/client/applications/api/_module.mjs";
import { ActorSheetV2, ItemSheetV2 } from "@7h3laughingman/foundry-types/client/applications/sheets/_module.mjs";
import { ContextMenuEntry } from "@7h3laughingman/foundry-types/client/applications/ux/context-menu.mjs";
import { ImageFilePath } from "@7h3laughingman/foundry-types/common/constants.mjs";
import { ItemAFMBE } from "item";

function applicationMixinAFMBE<
    TBase extends AbstractConstructorOf<ApplicationV2<any>>,
    TPart extends "header" | (string & {}),
    TContext extends ApplicationRenderContextAFMBE,
>(BaseApplication: TBase): ApplicationStaticAFMBE<TPart, TContext> & TBase {
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

        static PARTS: ApplicationPartAFMBE<"header", ApplicationRenderContextAFMBE> = {
            header: {
                template: "systems/afmbe-idle/templates/sheet-header.hbs",
                prepareContext: this.prepareHeaderContext,
            },
        };

        static prepareHeaderContext<T extends ApplicationRenderContextAFMBE>(
            this: ActorSheetV2<Actor, Item> | ItemSheetV2<Item>,
            context: T,
            _options: HandlebarsRenderOptions,
        ): T {
            context.name = this.document.name;
            context.img = this.document.img;
            return context;
        }

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
            const cls = this.constructor as ApplicationStaticAFMBE<TPart, TContext>;
            const part = cls.PARTS[partId];
            return part?.prepareContext?.call(this, context, options) ?? context;
        }

        _attachPartListeners(
            this: HandlebarsApplication,
            partId: TPart,
            html: HTMLElement,
            options: HandlebarsRenderOptions,
        ) {
            super._attachPartListeners(partId, html, options);
            const cls = this.constructor as ApplicationStaticAFMBE<TPart, TContext>;
            const part = cls.PARTS[partId];
            part?.activateListeners?.call(this, html, options);
        }

        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions) {
            super._replaceHTML(result, content, options);
            content.dataset.tooltipDirection = "UP";

            const inputs = content.querySelectorAll<HTMLInputElement>(`input[type="number"], input[type="text"]`);
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

    return HandlebarsApplicationAFMBE as unknown as ApplicationStaticAFMBE<TPart, TContext> & TBase;
}

interface HandlebarsApplicationAFMBE extends HandlebarsApplication {
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

type ApplicationRenderContextAFMBE = DocumentSheetRenderContext & {
    img?: ImageFilePath | null;
    name?: string;
};

interface ApplicationStaticAFMBE<TPart extends string, TContext extends ApplicationRenderContextAFMBE>
    extends ConstructorOf<HandlebarsApplicationAFMBE>, HandlebarsApplicationStatic {
    PARTS: ApplicationPartAFMBE<TPart, TContext>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
    prepareHeaderContext(context: TContext, options: HandlebarsRenderOptions): TContext;
}

type ApplicationPartAFMBE<TPart extends string, TContext extends ApplicationRenderContextAFMBE> = Record<
    TPart,
    HandlebarsTemplatePart & {
        activateListeners?: (html: HTMLElement, options: HandlebarsRenderOptions) => void | Promise<void>;
        prepareContext?: (context: TContext, options: HandlebarsRenderOptions) => Promise<TContext> | TContext;
    }
>;

export { applicationMixinAFMBE };
export type { ApplicationPartAFMBE, ApplicationRenderContextAFMBE };
