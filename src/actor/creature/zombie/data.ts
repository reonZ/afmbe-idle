import { CreatureDataModel } from "actor";
import { Zombie, ZombieDataSchema, ZombieSystem } from ".";

class ZombieDataModel extends CreatureDataModel<Zombie, ZombieDataSchema> {
    static defineSchema(): ZombieDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();
        this.life.total = Infinity;
    }
}

interface ZombieDataModel extends ZombieSystem {}

export { ZombieDataModel };
