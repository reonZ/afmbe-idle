import { ItemType } from "item";
import { ActorAFMBE, ActorDataSchema, ActorSystem } from ".";

class ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ActorDataSchema {
        return {};
    }

    get allowedItems(): ItemType[] {
        return [];
    }
}

interface ActorDataModel<TParent extends ActorAFMBE, TSchema extends ActorDataSchema> extends ActorSystem<TParent> {}

export { ActorDataModel };
