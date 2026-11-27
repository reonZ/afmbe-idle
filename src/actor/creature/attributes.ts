import { ActorModule } from "actor";
import { localize } from "utils";
import { CreatureAFMBE, CREATURE_ATTRIBUTES, CreatureAttributeType } from ".";
import * as R from "remeda";

class CreatureAttributes<TParent extends CreatureAFMBE = CreatureAFMBE> extends ActorModule<TParent> {
    static getLabel(key: CreatureAttributeType): string {
        return localize("afmbe.actor.creature.attribute", key, "label");
    }

    static isAttributeType(key: Maybe<string>): key is CreatureAttributeType {
        return R.isIncludedIn(key, CREATURE_ATTRIBUTES);
    }

    _initialize(): void {
        for (const key of CREATURE_ATTRIBUTES) {
            this[key] = 0;
        }
    }

    toObect(): Record<CreatureAttributeType, number> {
        return R.fromKeys(CREATURE_ATTRIBUTES, (key) => this[key]);
    }
}

interface CreatureAttributes extends Record<CreatureAttributeType, number> {}

export { CreatureAttributes };
