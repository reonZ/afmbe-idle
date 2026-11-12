import { Weapon, WeaponDataSchema, WeaponDataSource } from ".";
import { PhysicalDataModel, PhysicalDataSource } from "..";

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

interface WeaponDataModel<TParent extends Weapon = Weapon> extends Omit<WeaponDataSource, keyof PhysicalDataSource> {}

export { WeaponDataModel };
