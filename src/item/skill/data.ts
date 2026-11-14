import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import * as R from "remeda";
import { getNextNameIndex, localize, signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource, Specialty } from ".";
import fields = foundry.data.fields;

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
            specialties: new fields.ArrayField(
                new fields.SchemaField({
                    level: new PositiveIntergerValueField({ min: 1 }),
                    name: new fields.StringField({
                        required: true,
                        nullable: false,
                        initial: undefined,
                    }),
                }),
            ),
        };
    }

    get bonus(): number {
        return this.level.value;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }

    addSpecialty({ level, name }: { name?: string; level?: number } = {}): Promise<TParent | undefined> {
        const specialties = this._source.specialties.slice();
        const baseName = localize("item.skill.specialty.name", { index: "" }).trim();
        const index = getNextNameIndex(baseName, specialties);

        specialties.push({
            level: { value: Math.max(level ?? 1, 1) },
            name: name ?? localize("item.skill.specialty.name", { index }).trim(),
        });

        return this.parent.update({ "system.specialties": specialties });
    }

    deleteSpecialtyByIndex(index: number): Promise<TParent | undefined> {
        const specialties = this._source.specialties.slice();
        specialties.splice(index, 1);
        return this.parent.update({ "system.specialties": specialties });
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        const source = this as SkillDataSource;

        this.specialties = R.pipe(
            source.specialties,
            R.map((source) => new Specialty(this.parent, source)),
            R.indexBy(R.prop("slug")),
        );
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends Omit<
    SkillDataSource,
    keyof ItemDataSource | "specialties"
> {
    level: { value: number };
    specialties: Record<string, Specialty<TParent>>;
}

export { SkillDataModel };
