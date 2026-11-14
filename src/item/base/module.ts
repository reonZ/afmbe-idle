import { ItemAFMBE } from ".";

class ItemModule<TParent extends ItemAFMBE> {
    parent: TParent;

    constructor(parent: TParent) {
        this.parent = parent;
        this._initialize();
    }

    get actor(): TParent["actor"] {
        return this.parent.actor;
    }

    _initialize() {}
}

export { ItemModule };
