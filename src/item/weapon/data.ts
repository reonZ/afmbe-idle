import { WeaponAFMBE, WeaponDataSchema, WeaponDataSource } from ".";
import { PhysicalDataModel, PhysicalDataSource } from "..";

class WeaponDataModel<TParent extends WeaponAFMBE = WeaponAFMBE> extends PhysicalDataModel<TParent, WeaponDataSchema> {
    static defineSchema(): WeaponDataSchema {
        return {
            ...super.defineSchema(),
        };
    }

    prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface WeaponDataModel<TParent extends WeaponAFMBE = WeaponAFMBE> extends Omit<
    WeaponDataSource,
    keyof PhysicalDataSource
> {}

export { WeaponDataModel };
