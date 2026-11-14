import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource } from "item";
import * as R from "remeda";
import { getNextNameIndex, localize, signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource, SkillSource } from ".";
import fields = foundry.data.fields;

type ParentSkill<TParent extends Skill = Skill> = Skill<Exclude<TParent["actor"], null>>;

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
            parentSkillId: new fields.DocumentIdField(),
        };
    }

    get bonus(): number {
        return this.level.value * (this.parentSkill ? 2 : 1) + (this.parentSkill?.system.bonus ?? 0);
    }

    get isParent(): boolean {
        return this.specialties.length > 0;
    }

    get parentSkill(): ParentSkill<TParent> | null {
        const parentId = this.parentSkillId;
        return (parentId && this.actor?.items.get<Skill<Exclude<TParent["actor"], null>>>(parentId)) || null;
    }

    get isSpecialty(): boolean {
        return !!this.parentSkill;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }

    get specialties(): ParentSkill<TParent>[] {
        return R.filter(
            this.actor?.itemTypes.skill ?? [],
            (skill) => skill._source.system.parentSkillId === this.id,
        ) as ParentSkill<TParent>[];
    }

    async addSpecialty({ level, name }: { name?: string; level?: number } = {}): Promise<
        Skill<TParent["parent"]> | undefined
    > {
        const baseName = localize("item.skill.specialty.name", { index: "" }).trim();
        const index = getNextNameIndex(baseName, this.specialties);

        const source: PreCreate<SkillSource> = {
            type: "skill",
            name: name?.trim() || localize("item.skill.specialty.name", { index }).trim(),
            system: {
                level: { value: level },
                parentSkillId: this.item.id,
            },
        };

        const results = await this.actor?.createEmbeddedDocuments("Item", [source]);
        return results?.[0] as Skill<TParent["parent"]> | undefined;
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends Omit<SkillDataSource, keyof ItemDataSource> {
    // parentSkill: TParent | null;
}

export { SkillDataModel };
