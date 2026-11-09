import { ActorAFMBE } from "actor";
import { ITEM_PHYSICAL_TYPES } from "item";
import * as R from "remeda";
import { ItemDataModel, ItemDataSchema, ItemInstances, ItemType } from ".";

abstract class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances[T] {
        return type === "physical" ? R.isIncludedIn(this.type, ITEM_PHYSICAL_TYPES) : this.type === type;
    }
}

interface ItemAFMBE {
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
