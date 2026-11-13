import {
    ApplicationV2,
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    HandlebarsApplication,
    HandlebarsApplicationStatic,
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
            return part?.prepareContext.call(this, context) ?? context;
        }
    }

    return HandlebarsApplicationAFMBE as unknown as ApplicationStaticAFMBE<TPart, TContext> & TBase;
}

interface ApplicationStaticAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext>
    extends ConstructorOf<HandlebarsApplication>, HandlebarsApplicationStatic {
    PARTS: ApplicationPartAFMBE<TPart, TContext>;
}

type ApplicationPartAFMBE<TPart extends string, TContext extends DocumentSheetRenderContext> = Record<
    TPart,
    HandlebarsTemplatePart & {
        prepareContext: (context: TContext) => Promise<TContext> | TContext;
    }
>;

export { applicationMixinAFMBE };
export type { ApplicationPartAFMBE };
