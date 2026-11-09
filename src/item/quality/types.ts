import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QualityDataModel } from ".";
import fields = foundry.data.fields;

type QualityDataSchema = ItemDataSchema & {};

type QualityDataSource = fields.ModelPropsFromSchema<QualityDataSchema>;

interface Quality<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: QualityDataModel;
}

export type { Quality, QualityDataSchema, QualityDataSource };
