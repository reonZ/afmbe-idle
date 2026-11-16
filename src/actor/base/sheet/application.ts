import { applicationMixinAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetRenderContext, ActorSheetRenderOptions } from "..";
import { ContextMenuEntry } from "@7h3laughingman/foundry-types/client/applications/ux/context-menu.mjs";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { height: 700, width: 750 },
    };

    async _prepareContext(options: ActorSheetRenderOptions): Promise<ActorSheetRenderContext> {
        const context = (await super._prepareContext(options)) as ActorSheetRenderContext;
        context.actor = this.actor;
        return context;
    }

    async _onFirstRender(context: object, options: ActorSheetRenderOptions): Promise<void> {
        await super._onFirstRender(context, options);

        this._createContextMenu(this._getItemContextOptions, "[data-item-uuid]", {
            hookName: "getActorSheetItemContextOptions",
            parentClassHooks: false,
        });
    }

    _getItemContextOptions(): ContextMenuEntry[] {
        const isEditable = this.isEditable;

        return [
            {
                icon: "fa-solid fa-pen-to-square",
                label: "afmbe.actor.contextMenu.item.edit",
                onClick: async (event, target) => {
                    const item = await this.getItemFromTargetElement(target);
                    item?.sheet.render(true);
                },
            },
            {
                icon: "fa-solid fa-trash",
                label: "afmbe.actor.contextMenu.item.delete",
                visible: isEditable,
                onClick: async (event, target) => {
                    const item = await this.getItemFromTargetElement(target);
                    item?.queryDelete();
                },
            },
        ];
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
