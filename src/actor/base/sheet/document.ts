import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "..";

abstract class ActorSheetAFMBE extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["afmbe", "actor"],
        form: {
            submitOnChange: true,
        },
        actions: {},
    };

    async _prepareContext(options: ActorSheetRenderOptions): Promise<ActorSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ActorSheetRenderContext;
        return context;
    }
}

export { ActorSheetAFMBE };
