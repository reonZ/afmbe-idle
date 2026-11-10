import { Creature } from "actor";

class CreatureLife<TParent extends Creature = Creature> {
    #parent: TParent;

    constructor(parent: TParent) {
        this.#parent = parent;
    }

    get actor(): TParent {
        return this.#parent;
    }

    get current(): number {
        return this.actor.system.life.value;
    }

    get total(): number {
        const { constitution, strength } = this.actor.attributes;
        return (constitution + strength) * 4 + 10 + this.actor.system.life.total;
    }
}

export { CreatureLife };
