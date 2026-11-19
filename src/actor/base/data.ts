import { ItemType } from "item";
import { ActorAFMBE, ActorDataSchema } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ActorDataSchema {
        return {};
    }

    get allowedItems(): ItemType[] {
        return [];
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> {}

export { ActorDataModel };
