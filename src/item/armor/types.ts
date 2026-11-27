import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { ArmorDataModel } from ".";
import type { PhysicalItemAFMBE, PhysicalDataSchema } from "..";

type ArmorDataSchema = PhysicalDataSchema & {};

type ArmorDataSource = ModelPropsFromSchema<ArmorDataSchema>;

declare class ArmorAFMBE<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends PhysicalItemAFMBE<TParent> {
    system: ArmorDataModel;
}

type ArmorSource = ItemSource<"armor", ArmorDataSource>;

export type { ArmorAFMBE, ArmorDataSchema, ArmorDataSource, ArmorSource };
