import { ItemAFMBE } from ".";

class ItemCollection<TParent extends ItemAFMBE, V extends { id: string }> extends Collection<string, V> {
    #parent: TParent;

    constructor(parent: TParent) {
        super();
        this.#parent = parent;
        this._initialize();
    }

    get item(): TParent {
        return this.#parent;
    }

    get actor(): TParent["actor"] {
        return this.item.actor;
    }

    _initialize(): void {}
}

export { ItemCollection };
