import { ActorAFMBE } from "actor";
import { ItemDataModel, ItemDataSchema, ItemInstances, ItemType } from ".";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {
    isOfType<T extends ItemType>(type: T): this is ItemInstances[T] {
        return this.type === type;
    }
}

interface ItemAFMBE {
    system: ItemDataModel<ItemAFMBE, ItemDataSchema>;
}

export { ItemAFMBE };
