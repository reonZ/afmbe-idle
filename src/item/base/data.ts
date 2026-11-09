import { ItemAFMBE, ItemDataSchema, ItemDataSource } from ".";

class ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends foundry.abstract.TypeDataModel<
    TParent,
    TSchema
> {
    static defineSchema(): ItemDataSchema {
        return {};
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemDataSource {}

export { ItemDataModel };
