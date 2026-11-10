import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import { ActorSheetAFMBE, ActorSheetConfiguration } from "actor";
import * as R from "remeda";
import { localize } from "utils";
import { CreatureSheetPart, CreatureSheetRenderContext, CreatureSheetRenderOptions } from ".";
import { Creature, CREATURE_ATTRIBUTES, CREATURE_SECONDARY_ATTRIBUTES } from "..";

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
                return this.#prepareAttributesContext(context);
            default:
                return context;
        }
    }

    #prepareAttributesContext(context: CreatureSheetRenderContext): CreatureSheetRenderContext {
        const actor = this.actor;
        const speed = actor.system.speed.value;

        context.attributes = {
            primary: R.map(CREATURE_ATTRIBUTES, (key) => {
                const label = localize("actor.attributes", key);
                const value = actor.system.attributes[key];
                return { key, label, value };
            }),
            secondary: R.map(CREATURE_SECONDARY_ATTRIBUTES, (key) => {
                const { current, label, max } = actor[key];
                return { key, label, max, value: current };
            }),
            speed: {
                half: speed / 2,
                value: speed,
            },
        };

        return context;
    }
}

interface CreatureSheet<TParent extends Creature> {
    get actor(): TParent;
}

export { CreatureSheet };
