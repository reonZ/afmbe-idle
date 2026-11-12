import {
    Character,
    CharacterAttributeSource,
    CharacterAttributesSource,
    CREATURE_ATTRIBUTES,
    CreatureAttributes,
    CreatureAttributeType,
} from "actor";

class CharacterAttributes<TParent extends Character = Character> extends CreatureAttributes<TParent> {
    _initialize(): void {
        const attributes = this.actor.system.attributes as unknown as CharacterAttributesSource;

        for (const key of CREATURE_ATTRIBUTES) {
            const { base, drawback, improved } = attributes[key];
            this[key] = base + drawback + Number(improved);
        }
    }

    updateAttribute(key: CreatureAttributeType, changes: DeepPartial<CharacterAttributeSource>) {
        return this.update({ [key]: changes });
    }

    update(changes: DeepPartial<CharacterAttributesSource>) {
        return this.actor.update({ "system.attributes": changes });
    }
}

export { CharacterAttributes };
