import * as R from "remeda";
import { ItemAFMBE, ItemDataSchema, ItemDataSource, ItemType, SubItemDataSchema } from ".";
import fields = foundry.data.fields;

class ItemDataModel<
    TParent extends ItemAFMBE = ItemAFMBE,
    TSchema extends ItemDataSchema = ItemDataSchema,
> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    static defineSchema(): ItemDataSchema {
        const subItemsSchema = R.omit(
            foundry.documents.Item.defineSchema(), //
            ["effects", "folder", "_id"],
        ) as SubItemDataSchema;

        subItemsSchema._id = new fields.DocumentIdField({
            readonly: false,
            initial: () => foundry.utils.randomID(),
        });

        return {
            subItems: new fields.ArrayField(new fields.SchemaField(subItemsSchema)),
        };
    }

    get actor(): TParent["actor"] {
        return this.parent.actor;
    }

    get allowedSubItems(): ItemType[] {
        return [];
    }

    get id(): string {
        return this.item.id;
    }

    get item(): TParent {
        return this.parent;
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends ItemDataSource {}

export { ItemDataModel };
