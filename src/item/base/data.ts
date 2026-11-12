import { ItemAFMBE, ItemDataSchema, ItemSystem } from ".";

class ItemDataModel<
    TParent extends ItemAFMBE = ItemAFMBE,
    TSchema extends ItemDataSchema = ItemDataSchema,
> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    static defineSchema(): ItemDataSchema {
        return {};
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemSystem {}

export { ItemDataModel };
