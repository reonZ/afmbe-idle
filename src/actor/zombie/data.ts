import { CreatureDataModel } from "actor";
import { Zombie, ZombieDataSchema, ZombieSystem } from ".";

class ZombieDataModel extends CreatureDataModel<Zombie, ZombieDataSchema> {
    static defineSchema(): ZombieDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ZombieDataModel extends ZombieSystem {}

export { ZombieDataModel };
