import { ActorModule, Creature, CreatureAttribute } from "actor";
import { localize } from "utils";

class CreatureAttributesModule<TParent extends Creature = Creature> extends ActorModule<TParent> {
    get strength(): number {
        return this.actor.system.attributes.strength;
    }

    get dexterity(): number {
        return this.actor.system.attributes.dexterity;
    }

    get constitution(): number {
        return this.actor.system.attributes.constitution;
    }

    get intelligence(): number {
        return this.actor.system.attributes.intelligence;
    }

    get perception(): number {
        return this.actor.system.attributes.perception;
    }

    get willpower(): number {
        return this.actor.system.attributes.willpower;
    }

    static getLabel(key: CreatureAttribute): string {
        return localize("actor.creature.attributes", key, "label");
    }
}

export { CreatureAttributesModule };
