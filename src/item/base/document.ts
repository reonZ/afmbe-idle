import { ActorAFMBE } from "actor";

class ItemAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Item<TParent> {}

export { ItemAFMBE };
