import { ItemAFMBE } from ".";

class ItemModule<TParent extends ItemAFMBE> {
    #parent: TParent;

    constructor(parent: TParent) {
        this.#parent = parent;
        this._initialize();
    }

    get item(): TParent {
        return this.#parent;
    }

    get actor(): TParent["actor"] {
        return this.item.actor;
    }

    _initialize() {}
}

export { ItemModule };
