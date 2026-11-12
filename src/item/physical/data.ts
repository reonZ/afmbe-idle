import { ItemDataModel, Physical, PhysicalDataSchema, PhysicalSystem } from "item";

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
> extends PhysicalSystem<TParent> {}

export { PhysicalDataModel };
