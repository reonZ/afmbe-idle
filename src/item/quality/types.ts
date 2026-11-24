import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type {
    ModelPropsFromSchema,
    NumberField,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { Character } from "actor";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QUALITY_CATEGORIES, QUALITY_TYPES, QualityDataModel } from ".";

type QualityType = (typeof QUALITY_TYPES)[number];

type QualityCategory = (typeof QUALITY_CATEGORIES)[number];

type QualityRangeSchema = {
    max: NumberField<number, number, true, false, true>;
    min: NumberField<number, number, true, false, true>;
};

type QualityDataSchema = ItemDataSchema & {
    category: StringField<QualityCategory, QualityCategory, true, false, true>;
    level: NumberField<number, number, true, false, true>;
    range: SchemaField<QualityRangeSchema>;
};

type QualityDataSource = ModelPropsFromSchema<QualityDataSchema>;

declare class Quality<TParent extends Character | null = Character | null> extends ItemAFMBE<TParent> {
    system: QualityDataModel;
}

type QualitySource = ItemSource<"quality", QualityDataSource>;

export type { Quality, QualityCategory, QualityDataSchema, QualityDataSource, QualitySource, QualityType };
