import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import { ActorSheetAFMBE, ActorSheetConfiguration } from "actor";
import * as R from "remeda";
import { CreatureSheetPart, CreatureSheetRenderContext, CreatureSheetRenderOptions } from ".";
import { Creature, CREATURE_ATTRIBUTES } from "..";

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
        switch (partId) {
            case "attributes":
                return this.prepareAttributesContext(context);
            default:
                return context;
        }
    }

    prepareAttributesContext(context: CreatureSheetRenderContext): CreatureSheetRenderContext {
        const attributes = this.actor.system.attributes;

        context.attributes = {
            primary: R.map(CREATURE_ATTRIBUTES, (key) => {
                return { key, label: key, value: attributes[key] };
            }),
            secondary: [],
        };

        return context;
    }
}

interface CreatureSheet<TParent extends Creature> {
    get actor(): TParent;
}

export { CreatureSheet };
