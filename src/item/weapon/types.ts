import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { WeaponDataModel } from ".";
import type { Physical, PhysicalDataSchema } from "..";

type WeaponDataSchema = PhysicalDataSchema & {};

type WeaponDataSource = ModelPropsFromSchema<WeaponDataSchema>;

declare class Weapon<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Physical<TParent> {
    system: WeaponDataModel;
}

type WeaponSource = ItemSource<"weapon", WeaponDataSource>;

export type { Weapon, WeaponDataSchema, WeaponDataSource, WeaponSource };
