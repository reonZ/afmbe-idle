import { ActorAFMBE } from ".";

class ActorModule<TParent extends ActorAFMBE> {
    #parent: TParent;

    constructor(parent: TParent) {
        this.#parent = parent;
        this._initialize();
    }

    get actor(): TParent {
        return this.#parent;
    }

    _initialize() {}
}

export { ActorModule };
