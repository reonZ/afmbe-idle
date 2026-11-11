import { PositiveIntegerField } from "fields";
import { ItemDataModel, ItemModules } from "item";
import { Skill, SkillDataSchema, SkillSystem, SkillSpecialtiesModule } from ".";
import fields = foundry.data.fields;
import { signedNumber } from "utils";

class SkillDataModel extends ItemDataModel<Skill, SkillDataSchema> {
    static modules = {
        ...super.modules,
        specialties: SkillSpecialtiesModule,
    } satisfies ItemModules<Skill>;

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
