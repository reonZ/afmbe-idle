import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import * as R from "remeda";
import { signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource, Specialty } from ".";
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

    prepareDerivedData(): void {
        this.specialties = R.mapValues(this.specialties, (source) => new Specialty(this.parent, source));
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends Omit<SkillDataSource, keyof ItemDataSource> {
    level: { value: number };
    specialties: Record<string, Specialty<TParent>>;
}

export { SkillDataModel };
