import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type { ModelPropsFromSchema, StringField } from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { ActorAFMBE } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QUALITY_CATEGORIES, QUALITY_TYPES, QualityDataModel } from ".";

type QualityType = (typeof QUALITY_TYPES)[number];

type QualityCategory = (typeof QUALITY_CATEGORIES)[number];

type QualityDataSchema = ItemDataSchema & {
    category: StringField<QualityCategory, QualityCategory, true, false, true>;
    type: StringField<QualityType, QualityType, true, false, true>;
};

type QualityDataSource = ModelPropsFromSchema<QualityDataSchema>;

declare class Quality<TParent extends ActorAFMBE | null = ActorAFMBE | null> extends ItemAFMBE<TParent> {
    system: QualityDataModel;
}

type QualitySource = ItemSource<"quality", QualityDataSource>;

export type { Quality, QualityCategory, QualityDataSchema, QualityDataSource, QualitySource, QualityType };
