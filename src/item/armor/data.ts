import { Armor, ArmorDataSchema, ArmorSystem } from ".";
import { PhysicalDataModel } from "..";

class ArmorDataModel<TParent extends Armor = Armor> extends PhysicalDataModel<TParent, ArmorDataSchema> {
    static defineSchema(): ArmorDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ArmorDataModel<TParent extends Armor = Armor> extends ArmorSystem<TParent> {}

export { ArmorDataModel };
