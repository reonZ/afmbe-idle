import { PositiveIntegerField } from "fields";
import { ItemDataModel } from "item";
import { signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillSpecialtyCollection, SkillSystem } from ".";
import fields = foundry.data.fields;

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    collections = new SkillSpecialtyCollection(this.parent);

    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntegerField({ min: 1 }),
            specialties: new fields.ArrayField(
                new fields.SchemaField({
                    id: new fields.DocumentIdField({
                        nullable: false,
                        initial: () => foundry.utils.randomID(),
                    }),
                    level: new PositiveIntegerField({ min: 1 }),
                    name: new fields.StringField(),
                }),
            ),
        };
    }

    get bonus(): string {
        return signedNumber(this.level);
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends SkillSystem<TParent> {}

export { SkillDataModel };
