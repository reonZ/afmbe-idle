import { CreatureDataModel } from "actor";
import { Zombie, ZombieDataSchema, ZombieSystem } from ".";

class ZombieDataModel<TParent extends Zombie = Zombie> extends CreatureDataModel<TParent, ZombieDataSchema> {
    static defineSchema(): ZombieDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();
        this.life.max = Infinity;
    }
}

interface ZombieDataModel<TParent extends Zombie = Zombie> extends ZombieSystem<TParent> {}

export { ZombieDataModel };
