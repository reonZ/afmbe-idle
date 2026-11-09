import { ItemDataModel } from "item";
import { Skill, SkillDataSchema, SkillDataSource } from ".";

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

interface SkillDataModel extends SkillDataSource {}

export { SkillDataModel };
