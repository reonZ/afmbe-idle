import {
    Member,
    MemberAttributeSource,
    MemberAttributesSource,
    CREATURE_ATTRIBUTES,
    CreatureAttributes,
    CreatureAttributeType,
} from "actor";

class MemberAttributes<TParent extends Member = Member> extends CreatureAttributes<TParent> {
    _initialize(): void {
        const attributes = this.parent.system.attributes as unknown as MemberAttributesSource;

        for (const key of CREATURE_ATTRIBUTES) {
            const { base, drawback, improved } = attributes[key];
            this[key] = base + drawback + Number(improved);
        }
    }

    updateAttribute(key: CreatureAttributeType, changes: DeepPartial<MemberAttributeSource>) {
        return this.update({ [key]: changes });
    }

    update(changes: DeepPartial<MemberAttributesSource>) {
        return this.parent.update({ "system.attributes": changes });
    }
}

export { MemberAttributes };
