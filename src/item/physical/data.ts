import { ItemDataModel, ItemDataSource, Physical, PhysicalDataSchema, PhysicalDataSource } from "item";

class PhysicalDataModel<
    TParent extends Physical = Physical,
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
    TParent extends Physical = Physical,
    TSchema extends PhysicalDataSchema = PhysicalDataSchema,
> extends Omit<PhysicalDataSource, keyof ItemDataSource> {}

export { PhysicalDataModel };
