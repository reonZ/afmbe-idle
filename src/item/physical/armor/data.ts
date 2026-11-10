import { Armor, ArmorDataSchema, ArmorSystem } from ".";
import { PhysicalDataModel } from "..";

class ArmorDataModel extends PhysicalDataModel<Armor, ArmorDataSchema> {
    static defineSchema(): ArmorDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ArmorDataModel extends ArmorSystem {}

export { ArmorDataModel };
