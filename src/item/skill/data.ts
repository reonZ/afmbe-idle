import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import { localize, signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource, Specialty } from ".";
import fields = foundry.data.fields;
import * as R from "remeda";

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
            specialties: new fields.ArrayField(
                new fields.SchemaField({
                    id: new fields.StringField({
                        required: true,
                        nullable: false,
                        initial: undefined,
                    }),
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

    get modifier(): string {
        return signedNumber(this.level.value);
    }

    addSpecialty({
        id = foundry.utils.randomID(),
        level,
        name,
    }: { id?: string; name?: string; level?: number } = {}): Promise<TParent | undefined> {
        const specialties = this._source.specialties.slice();

        specialties.push({
            id,
            level: { value: Math.max(level ?? 1, 1) },
            name: name ?? localize("item.skill.specialty.name"),
        });

        return this.parent.update({ "system.specialties": specialties });
    }

    deleteSpecialty(id: string): Promise<TParent | undefined> | TParent {
        const specialties = this._source.specialties.slice();
        const deleted = specialties.findSplice((speciality) => speciality.id === id);

        if (deleted) {
            return this.parent.update({ "system.specialties": specialties });
        } else {
            return this.parent;
        }
    }

    prepareBaseData(): void {
        super.prepareBaseData();

        const source = this as SkillDataSource;

        this.specialties = R.pullObject(
            source.specialties,
            R.prop("id"),
            (source) => new Specialty(this.parent, source),
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
