import { ACTOR_CREATURE_TYPES } from "actor";
import * as R from "remeda";
import { ActorDataModel, ActorDataSchema, ActorInstances, ActorItemTypes, ActorType } from ".";

class ActorAFMBE<TParent extends TokenDocument | null = TokenDocument | null> extends Actor<TParent> {
    isOfType<T extends ActorType | "creature">(type: T): this is ActorInstances[T] {
        return type === "creature" ? R.isIncludedIn(this.type, ACTOR_CREATURE_TYPES) : this.type === type;
    }
}

interface ActorAFMBE {
    get itemTypes(): ActorItemTypes;
    system: ActorDataModel<ActorAFMBE, ActorDataSchema>;
}

export { ActorAFMBE };
