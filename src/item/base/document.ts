import { ActorAFMBE } from "actor";
import { PHYSICAL_TYPES } from "item";
import * as R from "remeda";
import { ItemDataModel, ItemDataSchema, ItemInstances, ItemType } from ".";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    isOfType<T extends ItemType | "physical">(type: T): this is ItemInstances[T] {
        return type === "physical" ? R.isIncludedIn(this.type, PHYSICAL_TYPES) : this.type === type;
    }
}

interface ItemAFMBE {
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
