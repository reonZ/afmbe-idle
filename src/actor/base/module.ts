import { ActorAFMBE } from ".";

class ActorModule<TParent extends ActorAFMBE = ActorAFMBE> {
    #parent: TParent;

    constructor(parent: TParent) {
        this.#parent = parent;
    }

    get actor(): TParent {
        return this.#parent;
    }
}

export { ActorModule };
