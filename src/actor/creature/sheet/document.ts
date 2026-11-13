import { ActorParts, ActorSheetAFMBE, ActorSheetConfiguration } from "actor";
import * as R from "remeda";
import { splitString } from "utils";
import { CreatureSheetPart, CreatureSheetRenderContext, RollTaskTargetData } from ".";
import {
    Creature,
    CREATURE_ATTRIBUTES,
    CREATURE_SECONDARIES,
    CreatureAttributes,
    RollTaskApplication,
    RollTaskData,
} from "..";

abstract class CreatureSheet<TParent extends Creature = Creature> extends ActorSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<ActorSheetConfiguration> = {
        classes: ["creature"],
        position: {
            width: 480,
        },
        actions: {
            "roll-task": this.#rollTask,
        },
    };

    static PARTS = {
        ...super.PARTS,
        attributes: {
            template: "systems/afmbe-idle/templates/actor/creature/attributes.hbs",
            prepareContext: this.prepareAttributesContext,
        },
    } satisfies ActorParts<CreatureSheetPart, CreatureSheetRenderContext>;

    static prepareAttributesContext<T extends CreatureSheetRenderContext>(this: CreatureSheet, context: T): T {
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
            mode: event.ctrlKey ? "private" : "public",
            select: R.omit(data, ["disable", "hide", "tooltip"]),
            title: data.tooltip,
        };
        RollTaskApplication.roll(this.actor, taskData);
    }
}

export { CreatureSheet };
