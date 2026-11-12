import { HandlebarsTemplatePart } from "@7h3laughingman/foundry-types/client/applications/api/handlebars-application.mjs";
import { ActorSheetAFMBE, ActorSheetConfiguration } from "actor";
import * as R from "remeda";
import { CreatureSheetPart, CreatureSheetRenderContext, CreatureSheetRenderOptions, RollTaskTargetData } from ".";
import {
    Creature,
    CREATURE_ATTRIBUTES,
    CREATURE_SECONDARIES,
    CreatureAttributes,
    RollTaskApplication,
    RollTaskData,
} from "..";
import { splitString } from "utils";

abstract class CreatureSheet<TParent extends Creature> extends ActorSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["creature"],
        position: {
            width: 480,
        },
        actions: {
            "roll-task": this.#rollTask,
        },
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

        context.attributes = {
            primary: R.map(CREATURE_ATTRIBUTES, (key) => {
                const label = CreatureAttributes.getLabel(key);
                const value = actor.system.attributes[key];
                return { key, label, value };
            }),
            secondary: R.map(CREATURE_SECONDARIES, (key) => {
                const { value, label, max } = actor.system[key];
                return { key, label, max: max === Infinity ? null : max, value };
            }),
            speed: actor.system.speed,
        };

        return context;
    }

    static #rollTask(this: CreatureSheet<Creature>, event: PointerEvent, target: HTMLElement) {
        const data = target.dataset as RollTaskTargetData;
        const taskData: RollTaskData = {
            disable: splitString(data.disable ?? ""),
            hide: splitString(data.hide ?? ""),
            select: R.omit(data, ["disable", "hide", "tooltip"]),
            title: data.tooltip,
        };
        RollTaskApplication.roll(this.actor, taskData, event);
    }
}

export { CreatureSheet };
