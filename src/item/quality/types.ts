import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QualityDataModel } from ".";

type QualityDataSchema = ItemDataSchema & {};

type QualityDataSource = ModelPropsFromSchema<QualityDataSchema>;

declare class Quality<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: QualityDataModel;
}

type QualitySource = ItemSource<"quality", QualityDataSource>;

export type { Quality, QualityDataSchema, QualityDataSource, QualitySource };
