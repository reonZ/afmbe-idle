import { Weapon, WeaponDataSchema, WeaponSystem } from ".";
import { PhysicalDataModel } from "..";

class WeaponDataModel<TParent extends Weapon = Weapon> extends PhysicalDataModel<TParent, WeaponDataSchema> {
    static defineSchema(): WeaponDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface WeaponDataModel<TParent extends Weapon = Weapon> extends WeaponSystem<TParent> {}

export { WeaponDataModel };
