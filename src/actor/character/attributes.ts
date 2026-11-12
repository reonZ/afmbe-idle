import {
    Character,
    CharacterAttributeSource,
    CharacterAttributesSource,
    CreatureAttribute,
    CreatureAttributesModule,
} from "actor";

class CharacterAttributesModule extends CreatureAttributesModule<Character> {
    updateAttribute(key: CreatureAttribute, changes: DeepPartial<CharacterAttributeSource>) {
        return this.update({ [key]: changes });
    }

    update(changes: DeepPartial<CharacterAttributesSource>) {
        return this.actor.update({ "system.attributes": changes });
    }
}

export { CharacterAttributesModule };
