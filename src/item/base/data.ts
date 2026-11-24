import * as R from "remeda";
import { ItemAFMBE, ItemDataSchema, ItemDataSource, ItemSourceAFMBE, ItemType, SubItemDataSchema } from ".";
import fields = foundry.data.fields;
import { RequiredHTMLField } from "fields";

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
            description: new RequiredHTMLField(),
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

    isValidSubItem(item: ItemAFMBE | DeepPartial<ItemSourceAFMBE>): boolean {
        return R.isIncludedIn(item.type, this.allowedSubItems);
    }
}

interface ItemDataModel<TParent extends ItemAFMBE, TSchema extends ItemDataSchema> extends Omit<
    ItemDataSource,
    "subItems"
> {
    subItems: ItemSourceAFMBE[];
}

export { ItemDataModel };
