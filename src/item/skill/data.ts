import { PositiveIntergerValueField } from "fields";
import { ItemDataModel, ItemDataSource, ItemType, SubItems } from "item";
import * as R from "remeda";
import { localize, signedNumber } from "utils";
import { SkillAFMBE, SkillDataSchema, SkillDataSource, SkillSource } from ".";

class SkillDataModel<TParent extends SkillAFMBE = SkillAFMBE> extends ItemDataModel<TParent, SkillDataSchema> {
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
        return this.level.value * (this.isSpecialty ? 2 : 1) + (this.item.rootParentItem?.system.bonus ?? 0);
    }

    get isParent(): boolean {
        return this.subItems.length > 0;
    }

    get isSpecialty(): boolean {
        return !!this.parentSkill;
    }

    get label(): string {
        const parent = this.item.rootParentItem;
        return parent ? `${parent.name} [${this.item.name}]` : this.item.name;
    }

    get modifier(): string {
        return signedNumber(this.bonus);
    }

    get parentSkill(): SkillAFMBE<TParent["actor"]> | null {
        return this.item.parentItem;
    }

    get specialties(): SubItems<SkillAFMBE<TParent["actor"]>, SkillAFMBE<TParent["actor"]>> {
        return this.item.subItems;
    }

    get deepSpecialties(): SkillAFMBE<TParent["actor"]>[] {
        return R.flatMap(this.specialties.contents, (specialty) => {
            return [specialty, ...specialty.system.deepSpecialties];
        });
    }

    async addSpecialty({ level, name }: { name?: string; level?: number } = {}): Promise<
        SkillAFMBE<TParent["parent"]> | undefined
    > {
        const source: PreCreate<SkillSource> = {
            type: "skill",
            name: name?.trim() || localize("afmbe.item.skill.specialty.name"),
            system: {
                level: { value: level },
            },
        };

        const [item] = await this.item.createEmbeddedDocuments("Item", [source]);
        return item as SkillAFMBE<TParent["parent"]> | undefined;
    }
}

interface SkillDataModel<TParent extends SkillAFMBE = SkillAFMBE> extends Omit<SkillDataSource, keyof ItemDataSource> {}

export { SkillDataModel };
