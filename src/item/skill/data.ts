import { PositiveIntergerValueField } from "fields";
import { ItemDataModel } from "item";
import { signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillSystem } from ".";
import fields = foundry.data.fields;

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
            specialties: new fields.TypedObjectField(
                new fields.SchemaField({
                    level: new PositiveIntergerValueField({ min: 1 }),
                    name: new fields.StringField({
                        required: true,
                        nullable: false,
                        initial: undefined,
                    }),
                    slug: new fields.StringField({
                        required: true,
                        nullable: false,
                        initial: undefined,
                    }),
                }),
            ),
        };
    }

    get modifier(): string {
        return signedNumber(this.level.value);
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends SkillSystem<TParent> {}

export { SkillDataModel };
