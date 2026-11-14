import { ActorAFMBE } from ".";

class ActorModule<TParent extends ActorAFMBE> {
    parent: TParent;

    constructor(parent: TParent) {
        this.parent = parent;
        this._initialize();
    }

    _initialize() {}
}

export { ActorModule };
