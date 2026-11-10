import { ActorModule, Character, CharacterAttributeSource, CharacterAttributesSource, CreatureAttribute } from "actor";

class CharacterAttributesModule extends ActorModule<Character> {
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

    updateAttribute(key: CreatureAttribute, changes: DeepPartial<CharacterAttributeSource>) {
        return this.update({ [key]: changes });
    }

    update(changes: DeepPartial<CharacterAttributesSource>) {
        return this.actor.update({ "system.attributes": changes });
    }
}

export { CharacterAttributesModule };
