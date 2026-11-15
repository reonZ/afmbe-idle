import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource, ItemType } from "item";
import { getNextNameIndex, localize, signedNumber } from "utils";
import { Skill, SkillDataSchema, SkillDataSource } from ".";

class SkillDataModel<TParent extends Skill = Skill> extends ItemDataModel<TParent, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
            level: new PositiveIntergerValueField({ min: 1 }),
        };
    }

    get allowedSubItems(): ItemType[] {
        return ["skill"];
    }

    get bonus(): number {
        return this.level.value * (this.isSpecialty ? 2 : 1) + (this.parentSkill?.system.bonus ?? 0);
    }

    get isParent(): boolean {
        return this.subItems.length > 0;
    }

    get parentSkill(): Skill<TParent["actor"]> | null {
        return this.item.parentItem;
    }

    get isSpecialty(): boolean {
        return !!this.parentSkill;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }

    get specialties(): Collection<string, Skill<TParent["actor"]>> {
        return this.item.subItems;
    }

    async addSpecialty({ level, name }: { name?: string; level?: number } = {}): Promise<
        Skill<TParent["parent"]> | undefined
    > {
        const baseName = localize("item.skill.specialty.name", { index: "" }).trim();
        const index = getNextNameIndex(baseName, this.specialties.contents);
        //
        //         const source: PreCreate<SkillSource> = {
        //             type: "skill",
        //             name: name?.trim() || localize("item.skill.specialty.name", { index }).trim(),
        //             system: {
        //                 level: { value: level },
        //                 parentSkillId: this.item.id,
        //             },
        //         };
        //
        //         const results = await this.actor?.createEmbeddedDocuments("Item", [source]);
        //         return results?.[0] as Skill<TParent["parent"]> | undefined;
    }
}

interface SkillDataModel<TParent extends Skill = Skill> extends Omit<SkillDataSource, keyof ItemDataSource> {}

export { SkillDataModel };
