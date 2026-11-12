import { ActorModule } from "actor";
import { localize } from "utils";
import { Creature, CREATURE_ATTRIBUTES, CreatureAttributeType } from ".";
import * as R from "remeda";

class CreatureAttributes<TParent extends Creature = Creature> extends ActorModule<TParent> {
    static getLabel(key: CreatureAttributeType): string {
        return localize("actor.creature.attributes", key, "label");
    }

    toObect(): Record<CreatureAttributeType, number> {
        return R.fromKeys(CREATURE_ATTRIBUTES, (key) => this[key]);
    }
}

interface CreatureAttributes extends Record<CreatureAttributeType, number> {}

export { CreatureAttributes };
