import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import {
    ActorAFMBE,
    ActorSheetConfiguration,
    ActorSheetPart,
    ActorSheetRenderContext,
    ActorSheetRenderOptions,
} from "..";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { height: 700, width: 750 },
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/actor/header.hbs",
        },
    } satisfies ApplicationPartAFMBE<ActorSheetPart, ActorSheetRenderContext>;

    async _prepareContext(options: ActorSheetRenderOptions): Promise<ActorSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ActorSheetRenderContext;
        context.actor = this.actor;
        context.isOwned = !!this.actor;
        return context;
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
