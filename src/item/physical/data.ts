import { ItemAFMBE, ItemDataModel, ItemDataSchema, PhysicalSystem } from "item";

class PhysicalDataModel<
    TParent extends ItemAFMBE = ItemAFMBE,
    TSchema extends ItemDataSchema = ItemDataSchema,
> extends ItemDataModel<TParent, TSchema> {
    static defineSchema(): ItemDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface PhysicalDataModel<
    TParent extends ItemAFMBE,
    TSchema extends ItemDataSchema,
> extends PhysicalSystem<TParent> {}

export { PhysicalDataModel };
