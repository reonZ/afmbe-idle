import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import { ActorSheetAFMBE, ActorSheetConfiguration } from "actor";
import { CreatureSheetPart, CreatureSheetRenderContext, CreatureSheetRenderOptions } from ".";
import { Creature } from "..";

abstract class CreatureSheet<TParent extends Creature> extends ActorSheetAFMBE {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["creature"],
        position: {
            width: 480,
        },
        actions: {},
    };

    static PARTS: Record<string, HandlebarsTemplatePart> = {
        attributes: {
            classes: ["attributes"],
            template: "systems/afmbe-idle/templates/actor/creature/attributes.hbs",
        },
    };

    async _prepareContext(options: CreatureSheetRenderOptions): Promise<CreatureSheetRenderContext> {
        const context = (await super._prepareContext(options)) as CreatureSheetRenderContext;
        return context;
    }

    async _preparePartContext(
        partId: CreatureSheetPart,
        context: CreatureSheetRenderContext,
    ): Promise<CreatureSheetRenderContext> {
        return context;
    }
}

interface CreatureSheet<TParent extends Creature> {
    get actor(): TParent;
}

export { CreatureSheet };
