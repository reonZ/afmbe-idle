import { Weapon, WeaponDataSchema, WeaponSystem } from ".";
import { PhysicalDataModel } from "..";

class WeaponDataModel extends PhysicalDataModel<Weapon, WeaponDataSchema> {
    static defineSchema(): WeaponDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface WeaponDataModel extends WeaponSystem<Weapon> {}

export { WeaponDataModel };
