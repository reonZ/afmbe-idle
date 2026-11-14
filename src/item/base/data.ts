import { ItemAFMBE, ItemDataSchema, ItemDataSource } from ".";

class ItemDataModel<
    TParent extends ItemAFMBE = ItemAFMBE,
    TSchema extends ItemDataSchema = ItemDataSchema,
> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    static defineSchema(): ItemDataSchema {
        return {};
    }

    get actor(): TParent["actor"] {
        return this.parent.actor;
    }

    get id(): string {
        return this.item.id;
    }

    get item(): TParent {
        return this.item;
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemDataSource {}

export { ItemDataModel };
