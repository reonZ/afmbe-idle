import { CreatureAttributes, CreatureDataModel, CreatureDataSource } from "actor";
import { ZombieAFMBE, ZombieDataSchema, ZombieDataSource } from ".";

class ZombieDataModel<TParent extends ZombieAFMBE = ZombieAFMBE> extends CreatureDataModel<TParent, ZombieDataSchema> {
    static defineSchema(): ZombieDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        this.attributes = new CreatureAttributes(this.parent);
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();
        this.life.max = Infinity;
    }
}

interface ZombieDataModel<TParent extends ZombieAFMBE = ZombieAFMBE> extends Omit<
    ZombieDataSource,
    keyof CreatureDataSource
> {}

export { ZombieDataModel };
