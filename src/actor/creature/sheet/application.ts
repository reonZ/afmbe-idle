import { ActorSheetAFMBE } from "actor";
import { DocumentSheetPartAFME } from "document-sheet";
import * as R from "remeda";
import { splitString } from "utils";
import {
    CreatureSheetConfiguration,
    CreatureSheetPart,
    CreatureSheetQuality,
    CreatureSheetRenderContext,
    RollTaskTargetData,
} from ".";
import { Creature, CREATURE_ATTRIBUTES, CREATURE_SECONDARIES, CreatureAttributes } from "..";
import { QualityType } from "item";

abstract class CreatureSheet<TParent extends Creature = Creature> extends ActorSheetAFMBE<TParent> {
    static DEFAULT_OPTIONS: DeepPartial<CreatureSheetConfiguration> = {
        classes: ["creature"],
        actions: {
            "roll-task": this.#rollTask,
        },
    };

    static PARTS: DocumentSheetPartAFME<CreatureSheetPart, CreatureSheetRenderContext> = {
        header: {
            template: "systems/afmbe-idle/templates/actor/creature/sheet-header.hbs",
        },
        attributes: {
            template: "systems/afmbe-idle/templates/actor/creature/attributes.hbs",
            prepareContext: this.prepareAttributesContext,
        },
        qualities: {
            template: "systems/afmbe-idle/templates/actor/creature/qualities.hbs",
            prepareContext: this.prepareQualitiesContext,
        },
    };

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

    static prepareQualitiesContext(this: CreatureSheet, context: CreatureSheetRenderContext) {
        const [drawbacks, qualities] = R.pipe(
            this.actor.itemTypes.quality,
            R.map((item): CreatureSheetQuality & { type: QualityType } => {
                return { id: item.chainId, level: item.system.level, name: item.name, type: item.system.type };
            }),
            R.partition(({ type }) => type === "drawback"),
        );

        context.drawbacks = drawbacks;
        context.qualities = qualities;
    }

    static #rollTask(this: CreatureSheet, event: PointerEvent, target: HTMLElement) {
        const data = target.dataset as RollTaskTargetData;

        this.actor.system.rollTask({
            disable: splitString(data.disable ?? ""),
            mode: event.ctrlKey ? "private" : "public",
            select: R.pick(data, ["attribute", "difficulty", "skill"]),
        });
    }
}

export { CreatureSheet };
