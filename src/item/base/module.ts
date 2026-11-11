import { ItemAFMBE } from ".";

class ItemModule<TParent extends ItemAFMBE> {
    #parent: TParent;

    constructor(parent: TParent) {
        this.#parent = parent;
    }

    get item(): TParent {
        return this.#parent;
    }

    get actor(): TParent["actor"] {
        return this.item.actor;
    }
}

export { ItemModule };
