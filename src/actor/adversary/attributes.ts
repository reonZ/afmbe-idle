import { AdversaryAttributesSource, CREATURE_ATTRIBUTES, CreatureAttributes, CreatureAttributeType } from "actor";

class AdversaryAttributes extends CreatureAttributes {
    _initialize(): void {
        const attributes = this.parent.system.attributes as unknown as AdversaryAttributesSource;

        for (const key of CREATURE_ATTRIBUTES) {
            this[key] = attributes[key].value;
        }
    }

    updateAttribute(key: CreatureAttributeType, value: number) {
        return this.update({ [key]: value });
    }

    update(changes: DeepPartial<Record<CreatureAttributeType, number>>) {
        return this.parent.update({ "system.attributes": changes });
    }
}

export { AdversaryAttributes };
