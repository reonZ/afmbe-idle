import { ItemAFMBE, ItemSourceAFMBE, ItemType } from "item";
import * as R from "remeda";
import { ActorAFMBE, ActorDataSchema } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ActorDataSchema {
        return {};
    }

    get allowedItems(): ItemType[] {
        return [];
    }

    isValidItem(item: ItemAFMBE | DeepPartial<ItemSourceAFMBE>): boolean {
        return R.isIncludedIn(item.type, this.allowedItems);
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> {}

export { ActorDataModel };
