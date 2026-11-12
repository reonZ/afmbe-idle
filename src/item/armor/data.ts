import { Armor, ArmorDataSchema, ArmorDataSource } from ".";
import { PhysicalDataModel, PhysicalDataSource } from "..";

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

interface ArmorDataModel<TParent extends Armor = Armor> extends Omit<ArmorDataSource, keyof PhysicalDataSource> {}

export { ArmorDataModel };
