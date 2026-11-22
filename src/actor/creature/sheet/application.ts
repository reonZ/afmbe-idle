import { ActorSheetAFMBE } from "actor";
import { DocumentSheetPartAFME } from "handlebars-sheet";
import * as R from "remeda";
import { splitString } from "utils";
import { CreatureSheetConfiguration, CreatureSheetPart, CreatureSheetRenderContext, RollTaskTargetData } from ".";
import { Creature, CREATURE_ATTRIBUTES, CREATURE_SECONDARIES, CreatureAttributes } from "..";

abstract class CreatureSheet<TParent extends Creature = Creature> extends ActorSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<CreatureSheetConfiguration> = {
        classes: ["creature"],
        position: { height: 650 },
        actions: {
            "roll-task": this.#rollTask,
        },
    };

    static PARTS: DocumentSheetPartAFME<CreatureSheetPart, CreatureSheetRenderContext> = {
        header: {
            template: "systems/afmbe-idle/templates/actor/creature/sheet-header.hbs",
            prepareContext: this.prepareHeaderContext,
        },
        attributes: {
            template: "systems/afmbe-idle/templates/actor/creature/attributes.hbs",
            prepareContext: this.prepareAttributesContext,
        },
    };

    static prepareHeaderContext(this: CreatureSheet, context: CreatureSheetRenderContext) {
        context.name = this.actor.name;
    }

    static prepareAttributesContext(this: CreatureSheet, context: CreatureSheetRenderContext) {
        context.img = this.actor.img;
        context.primary = R.map(CREATURE_ATTRIBUTES, (key) => {
            const label = CreatureAttributes.getLabel(key);
            const value = this.actor.system.attributes[key];
            return { key, label, value };
        });
        context.secondary = R.map(CREATURE_SECONDARIES, (key) => {
            const { value, label, max } = this.actor.system[key];
            return { key, label, max: max === Infinity ? null : max, value };
        });
        context.speed = this.actor.system.speed;
    }

    static #rollTask(this: CreatureSheet, event: PointerEvent, target: HTMLElement) {
        const data = target.dataset as RollTaskTargetData;

        this.actor.system.rollTask({
            disable: splitString(data.disable ?? ""),
            mode: event.ctrlKey ? "private" : "public",
            select: R.pick(data, ["attribute", "difficulty", "skill"]),
            target: Number(data.target) || undefined,
        });
    }
}

export { CreatureSheet };
