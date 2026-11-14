import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import { getNextNameIndex, localize, signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource, SkillSource } from ".";
import fields = foundry.data.fields;
import * as R from "remeda";

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    #specialties?: Collection<string, Skill<TParent["parent"]>>;

    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
            parentSkill: new fields.ForeignDocumentField(SkillDataModel),
        };
    }

    get bonus(): number {
        return this.level.value + (this.parentSkill?.system.bonus ?? 0);
    }

    get isParent(): boolean {
        return this.specialties.size > 0;
    }

    get isSpeciality(): boolean {
        return !!this.parentSkill;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }

    get specialties() {
        return (this.#specialties ??= new Collection(
            R.pipe(
                this.actor?.itemTypes.skill ?? [],
                R.filter((skill) => skill._source.system.parentSkill === this.id),
                R.map((skill) => [skill.id, skill] as const),
            ),
        ));
    }

    async addSpecialty({ level, name }: { name?: string; level?: number } = {}): Promise<
        Skill<TParent["parent"]> | undefined
    > {
        const baseName = localize("item.skill.specialty.name", { index: "" }).trim();
        const index = getNextNameIndex(baseName, this.specialties.contents);

        const source: PreCreate<SkillSource> = {
            type: "skill",
            name: name?.trim() || localize("item.skill.specialty.name", { index }).trim(),
            system: {
                level: { value: level },
                parentSkill: this.item.id,
            },
        };

        const results = await this.actor?.createEmbeddedDocuments("Item", [source]);
        return results?.[0] as Skill<TParent["parent"]> | undefined;
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends Omit<
    SkillDataSource,
    keyof ItemDataSource | "parentSkill"
> {
    parentSkill: TParent | null;
}

export { SkillDataModel };
