import { ArmorAFMBE, ArmorDataSchema, ArmorDataSource } from ".";
import { PhysicalDataModel, PhysicalDataSource } from "..";

class ArmorDataModel<TParent extends ArmorAFMBE = ArmorAFMBE> extends PhysicalDataModel<TParent, ArmorDataSchema> {
    static defineSchema(): ArmorDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ArmorDataModel<TParent extends ArmorAFMBE = ArmorAFMBE> extends Omit<
    ArmorDataSource,
    keyof PhysicalDataSource
> {}

export { ArmorDataModel };
