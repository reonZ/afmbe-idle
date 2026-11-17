import { applicationMixinAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "..";
import * as R from "remeda";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { height: 500, width: 550 },
    };

    async _prepareContext(options: ActorSheetRenderOptions): Promise<ActorSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ActorSheetRenderContext;
        context.actor = this.actor;
        return context;
    }

    async _onDropItem(event: DragEvent, item: ItemAFMBE): Promise<Maybe<ItemAFMBE>> {
        if (!R.isIncludedIn(item.type, this.actor.system.allowedItems)) {
            ui.notifications.error("afmbe.actor.allowedItems.error", {
                format: { type: _loc(`TYPES.Item.${item.type}`) },
            });
            return;
        }
        return super._onDropItem(event, item);
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
