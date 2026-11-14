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

        async _preparePartContext(this: HandlebarsApplication, partId: TPart, context: TContext): Promise<TContext> {
            const cls = this.constructor as ApplicationStaticAFMBE<TPart, TContext>;
            const part = cls.PARTS[partId];
            return part?.prepareContext?.call(this, context) ?? context;
        }

        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions) {
            super._replaceHTML(result, content, options);
            content.dataset.tooltipDirection = "UP";
            this.activateListeners(content);
        }

        activateListeners(html: HTMLElement): void {
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
    }

    return HandlebarsApplicationAFMBE as unknown as ApplicationStaticAFMBE<TPart, TContext> & TBase;
}

interface ApplicationStaticAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext>
    extends ConstructorOf<HandlebarsApplication>, HandlebarsApplicationStatic {
    PARTS: ApplicationPartAFMBE<TPart, TContext>;
    activateListeners(html: HTMLElement): void | Promise<void>;
}

type ApplicationPartAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext> = Record<
    TPart,
    HandlebarsTemplatePart & {
        prepareContext: (context: TContext) => Promise<TContext> | TContext;
    }
>;

export { applicationMixinAFMBE };
export type { ApplicationPartAFMBE };
