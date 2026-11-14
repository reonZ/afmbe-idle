import { ACTOR_CREATURE_TYPES } from "actor";
import * as R from "remeda";
import { ActorDataModel, ActorDataSchema, ActorInstances, ActorItemTypes, ActorType } from ".";
import EmbeddedCollection from "@7h3laughingman/foundry-types/common/abstract/embedded-collection.mjs";
import { ItemAFMBE } from "item";

class ActorAFMBE<TParent extends TokenDocument | null = TokenDocument | null> extends Actor<TParent> {
    isOfType<T extends ActorType | "creature">(type: T): this is ActorInstances<this["parent"]>[T] {
        return type === "creature" ? R.isIncludedIn(this.type, ACTOR_CREATURE_TYPES) : this.type === type;
    }
}

interface ActorAFMBE {
    readonly items: EmbeddedCollection<ItemAFMBE<this>>;
    get itemTypes(): ActorItemTypes<this>;
    system: ActorDataModel<ActorAFMBE, ActorDataSchema>;
}

export { ActorAFMBE };
