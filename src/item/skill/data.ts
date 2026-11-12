import { PositiveIntegerField } from "fields";
import { ItemCollections, ItemDataModel } from "item";
import { signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillSpecialtyCollection, SkillSystem } from ".";
import fields = foundry.data.fields;

class SkillDataModel extends ItemDataModel<Skill, SkillDataSchema> {
    static collections = {
        ...super.modules,
        specialties: SkillSpecialtyCollection,
    } satisfies ItemCollections<Skill>;

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

    prepareBaseData(): void {
        super.prepareBaseData();

        Object.defineProperties(this.parent, {
            bonus: {
                get(): string {
                    return signedNumber(this.level);
                },
            },
            level: {
                get(): number {
                    return this.level;
                },
            },
        });
    }
}

interface SkillDataModel extends SkillSystem {}

export { SkillDataModel };
