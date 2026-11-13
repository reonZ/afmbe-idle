import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext } from "..";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { width: 480 },
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/actor/header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
    } satisfies ApplicationPartAFMBE<ActorSheetPart, ActorSheetRenderContext>;

    static prepareHeaderContext<T extends ActorSheetRenderContext>(this: ActorSheetAFMBE, context: T): T {
        context.name = this.actor.name;
        return context;
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
