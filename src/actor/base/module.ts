import { ActorAFMBE } from ".";

class ActorModule<TSource extends Record<string, any> = Record<string, any>, TParent extends ActorAFMBE = ActorAFMBE> {
    #parent: TParent;

    constructor(source: TSource, parent: TParent) {
        this.#parent = parent;
        Object.assign(this, source);
    }

    get parent(): TParent {
        return this.#parent;
    }

    get actor(): TParent {
        return this.#parent;
    }
}

export { ActorModule };
