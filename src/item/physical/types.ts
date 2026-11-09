import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { ArmorSource, PhysicalDataModel, WeaponSource } from ".";
import fields = foundry.data.fields;

type PhysicalDataSchema = ItemDataSchema & {};

type PhysicalDataSource = fields.ModelPropsFromSchema<PhysicalDataSchema>;

declare abstract class Physical<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: PhysicalDataModel;
}

type PhysicalSource = ArmorSource | WeaponSource;

export type { Physical, PhysicalDataSchema, PhysicalDataSource, PhysicalSource };
