import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { WeaponDataModel } from ".";
import type { PhysicalItemAFMBE, PhysicalDataSchema } from "..";

type WeaponDataSchema = PhysicalDataSchema & {};

type WeaponDataSource = ModelPropsFromSchema<WeaponDataSchema>;

declare class WeaponAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends PhysicalItemAFMBE<TParent> {
    system: WeaponDataModel;
}

type WeaponSource = ItemSource<"weapon", WeaponDataSource>;

export type { WeaponAFMBE, WeaponDataSchema, WeaponDataSource, WeaponSource };
