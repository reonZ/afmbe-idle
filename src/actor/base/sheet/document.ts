import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext } from "..";

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
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
