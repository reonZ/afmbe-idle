import { ItemAFMBE } from ".";

abstract class ItemCollection<TParent extends ItemAFMBE, V extends { id: string }> extends Collection<string, V> {
    #parent: TParent;

    constructor(parent: TParent) {
        super();
        this.#parent = parent;
    }

    get item(): TParent {
        return this.#parent;
    }

    get actor(): TParent["actor"] {
        return this.item.actor;
    }

    abstract _initialize(): void;
}

export { ItemCollection };
