import { ActorAFMBE } from "actor";
import { ITEM_PHYSICAL_TYPES } from "item";
import * as R from "remeda";
import { ItemDataModel, ItemDataSchema, ItemInstances, ItemSourceAFMBE, ItemType } from ".";
import { DatabaseCreateOperation } from "@7h3laughingman/foundry-types/common/abstract/_module.mjs";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    static override async createDocuments<TDocument extends foundry.abstract.Document>(
        this: ConstructorOf<TDocument>,
        data?: (TDocument | DeepPartial<TDocument["_source"]>)[],
        operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>,
    ): Promise<TDocument[]>;
    static override async createDocuments(
        data: (ItemAFMBE | PreCreate<ItemSourceAFMBE>)[] = [],
        operation: Partial<DatabaseCreateOperation<ActorAFMBE | null>> = {},
    ): Promise<Item[]> {
        const sources = data.map((itemOrSource) => {
            return itemOrSource instanceof ItemAFMBE ? itemOrSource.toObject() : itemOrSource;
        });

        // we prevent the creation of non-allowed actor items
        if (operation.parent) {
            const allowedItems = operation.parent.system.allowedItems;
            const validSources = R.filter(sources, (source) => allowedItems.includes(source.type));
            return super.createDocuments(validSources, operation);
        }

        return super.createDocuments(sources, operation);
    }

    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances<this["parent"]>[T] {
        return type === "physical" ? R.isIncludedIn(this.type, ITEM_PHYSICAL_TYPES) : this.type === type;
    }
}

interface ItemAFMBE {
    readonly _source: ItemSourceAFMBE;
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
