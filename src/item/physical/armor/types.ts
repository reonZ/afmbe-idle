import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ActorAFMBE } from "actor";
import type { ArmorDataModel } from ".";
import type { Physical, PhysicalDataSchema } from "..";
import fields = foundry.data.fields;

type ArmorDataSchema = PhysicalDataSchema & {};

type ArmorDataSource = fields.ModelPropsFromSchema<ArmorDataSchema>;

interface Armor<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends Physical<TParent> {
    system: ArmorDataModel;
}

type ArmorSource = ItemSource<"armor", ArmorDataSource>;

export type { Armor, ArmorDataSchema, ArmorDataSource, ArmorSource };
