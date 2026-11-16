import {
    ApplicationV2,
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    HandlebarsApplication,
    HandlebarsApplicationStatic,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@7h3laughingman/foundry-types/client/applications/api/_module.mjs";
import { ItemAFMBE } from "item";

function applicationMixinAFMBE<
    TBase extends AbstractConstructorOf<ApplicationV2<any>>,
    TPart extends "header" | (string & {}),
    TContext extends DocumentSheetRenderContext,
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

        static PARTS: ApplicationPartAFMBE<"header", DocumentSheetRenderContext> = {
            header: {
                template: "systems/afmbe-idle/templates/sheet-header.hbs",
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

        getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null> {
            return (this.constructor as typeof HandlebarsApplicationAFMBE).getItemFromTargetElement(target);
        }
    }

    return HandlebarsApplicationAFMBE as unknown as ApplicationStaticAFMBE<TPart, TContext> & TBase;
}

interface HandlebarsApplicationAFMBE extends HandlebarsApplication {
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

interface ApplicationStaticAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext>
    extends ConstructorOf<HandlebarsApplicationAFMBE>, HandlebarsApplicationStatic {
    PARTS: ApplicationPartAFMBE<TPart, TContext>;
    getItemFromTargetElement(target: HTMLElement): Promise<ItemAFMBE | null>;
}

type ApplicationPartAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext> = Record<
    TPart,
    HandlebarsTemplatePart & {
        activateListeners?: (html: HTMLElement, options: HandlebarsRenderOptions) => void | Promise<void>;
        prepareContext?: (context: TContext, options: HandlebarsRenderOptions) => Promise<TContext> | TContext;
    }
>;

export { applicationMixinAFMBE };
export type { ApplicationPartAFMBE };
