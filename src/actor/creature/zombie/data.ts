import { CreatureDataModel } from "actor";
import { Zombie, ZombieDataSchema, ZombieDataSource } from ".";

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

interface ZombieDataModel extends ZombieDataSource {}

export { ZombieDataModel };
