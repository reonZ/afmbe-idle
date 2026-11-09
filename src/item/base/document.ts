import { ActorAFMBE } from "actor";
import * as R from "remeda";
import { ITEM_PHYSICAL_TYPES, ItemDataModel, ItemDataSchema, ItemInstances, ItemType } from ".";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances[T] {
        return type === "physical" ? R.isIncludedIn(this.type, ITEM_PHYSICAL_TYPES) : this.type === type;
    }
}

interface ItemAFMBE {
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
