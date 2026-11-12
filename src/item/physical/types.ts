import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { ArmorSource, ItemAFMBE, ItemDataSchema, ItemSystem, WeaponSource } from "item";
import type { PhysicalDataModel } from ".";

type PhysicalDataSchema = ItemDataSchema & {};

type PhysicalDataSource = ModelPropsFromSchema<PhysicalDataSchema>;

type PhysicalSystem<TParent extends Physical = Physical> = ItemSystem<TParent>;

declare abstract class Physical<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: PhysicalDataModel;
}

type PhysicalSource = ArmorSource | WeaponSource;

export type { Physical, PhysicalDataSchema, PhysicalDataSource, PhysicalSource, PhysicalSystem };
