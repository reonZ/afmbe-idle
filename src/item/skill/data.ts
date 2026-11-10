import { ItemDataModel } from "item";
import { Skill, SkillDataSchema, SkillSystem } from ".";

class SkillDataModel extends ItemDataModel<Skill, SkillDataSchema> {
    static defineSchema(): SkillDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface SkillDataModel extends SkillSystem {}

export { SkillDataModel };
