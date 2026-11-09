import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QualityDataModel } from ".";
import fields = foundry.data.fields;

type QualityDataSchema = ItemDataSchema & {};

type QualityDataSource = fields.ModelPropsFromSchema<QualityDataSchema>;

interface Quality<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: QualityDataModel;
}

type QualitySource = ItemSource<"quality", QualityDataSource>;

export type { Quality, QualityDataSchema, QualityDataSource, QualitySource };
