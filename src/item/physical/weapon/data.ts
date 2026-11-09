import { Weapon, WeaponDataSchema, WeaponDataSource } from ".";
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

interface WeaponDataModel extends WeaponDataSource {}

export { WeaponDataModel };
