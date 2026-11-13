import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorParts, ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext } from "..";

abstract class ActorSheetAFMBE<
    TParent extends ActorAFMBE = ActorAFMBE,
> extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["afmbe", "actor"],
        form: {
            submitOnChange: true,
        },
        actions: {},
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/actor/header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
    } satisfies ActorParts<ActorSheetPart, ActorSheetRenderContext>;

    static prepareHeaderContext<T extends ActorSheetRenderContext>(this: ActorSheetAFMBE, context: T): T {
        context.name = this.actor.name;
        return context;
    }

    async _preparePartContext(
        partId: ActorSheetPart,
        context: ActorSheetRenderContext,
    ): Promise<ActorSheetRenderContext> {
        const part = (this.constructor as typeof ActorSheetAFMBE).PARTS[partId];
        return part?.prepareContext.call(this, context) ?? context;
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
