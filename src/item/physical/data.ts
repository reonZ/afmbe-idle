import { ItemDataModel, ItemDataSource, PhysicalItemAFMBE, PhysicalDataSchema, PhysicalDataSource } from "item";

class PhysicalDataModel<
    TParent extends PhysicalItemAFMBE = PhysicalItemAFMBE,
    TSchema extends PhysicalDataSchema = PhysicalDataSchema,
> extends ItemDataModel<TParent, TSchema> {
    static defineSchema(): PhysicalDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface PhysicalDataModel<
    TParent extends PhysicalItemAFMBE = PhysicalItemAFMBE,
    TSchema extends PhysicalDataSchema = PhysicalDataSchema,
> extends Omit<PhysicalDataSource, keyof ItemDataSource> {}

export { PhysicalDataModel };
