import {
    ApplicationV2,
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    HandlebarsApplication,
    HandlebarsApplicationStatic,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@7h3laughingman/foundry-types/client/applications/api/_module.mjs";

function applicationMixinAFMBE<
    TBase extends AbstractConstructorOf<ApplicationV2<any>>,
    TPart extends string,
    TContext extends DocumentSheetRenderContext,
>(BaseApplication: TBase): ApplicationStaticAFMBE<TPart, TContext> & TBase {
    abstract class HandlebarsApplicationAFMBE extends foundry.applications.api.HandlebarsApplicationMixin(
        BaseApplication,
    ) {
        static DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration> = {
            classes: ["afmbe"],
            form: { submitOnChange: true },
        };

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
    }

    return HandlebarsApplicationAFMBE as unknown as ApplicationStaticAFMBE<TPart, TContext> & TBase;
}

interface HandlebarsApplicationAFMBE extends HandlebarsApplication {}

interface ApplicationStaticAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext>
    extends ConstructorOf<HandlebarsApplicationAFMBE>, HandlebarsApplicationStatic {
    PARTS: ApplicationPartAFMBE<TPart, TContext>;
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
