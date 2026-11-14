import { applicationMixinAFMBE, ApplicationPartAFMBE } from "handlebars-application";
import { ItemAFMBE } from "item";
import { ActorAFMBE, ActorSheetConfiguration, ActorSheetPart, ActorSheetRenderContext } from "..";

abstract class ActorSheetAFMBE<TParent extends ActorAFMBE = ActorAFMBE> extends applicationMixinAFMBE(
    foundry.applications.sheets.ActorSheetV2<ActorAFMBE, ItemAFMBE>,
) {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["actor"],
        position: { height: 700, width: 750 },
        actions: {
            "open-sheet": this.#openSheet,
        },
    };

    static PARTS = {
        header: {
            template: "systems/afmbe-idle/templates/actor/header.hbs",
            prepareContext: this.prepareHeaderTemplate,
        },
    } satisfies ApplicationPartAFMBE<ActorSheetPart, ActorSheetRenderContext>;

    static prepareHeaderTemplate<T extends ActorSheetRenderContext>(this: ActorSheetAFMBE, context: T): T {
        context.name = this.actor.name;
        return context;
    }

    static #openSheet(this: ActorSheetAFMBE, _event: PointerEvent, target: HTMLElement) {
        const itemId = target.closest<HTMLElement>("[data-item-id]")?.dataset.itemId;
        this.actor.items.get(itemId ?? "")?.sheet.render(true);
    }
}

interface ActorSheetAFMBE<TParent extends ActorAFMBE> {
    get actor(): TParent;
}

export { ActorSheetAFMBE };
