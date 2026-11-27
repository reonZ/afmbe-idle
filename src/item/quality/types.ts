import type { ItemSource } from "@7h3laughingman/foundry-types/client/documents/_module.mjs";
import type {
    ModelPropsFromSchema,
    SchemaField,
    StringField,
} from "@7h3laughingman/foundry-types/common/data/fields.mjs";
import type { CharacterAFMBE } from "actor";
import { PositiveIntegerField } from "fields";
import type { ItemAFMBE, ItemDataSchema } from "item";
import type { QUALITY_CATEGORIES, QUALITY_TYPES, QualityDataModel } from ".";

type QualityType = (typeof QUALITY_TYPES)[number];

type QualityCategory = (typeof QUALITY_CATEGORIES)[number];

type QualityLevelSchema = {
    cost: PositiveIntegerField;
    max: PositiveIntegerField;
    value: PositiveIntegerField;
};

type QualityLevel = ModelPropsFromSchema<QualityLevelSchema>;

type QualityDataSchema = ItemDataSchema & {
    category: StringField<QualityCategory, QualityCategory, true, false, true>;
    level: SchemaField<QualityLevelSchema>;
    type: StringField<QualityType, QualityType, true, false, true>;
};

type QualityDataSource = ModelPropsFromSchema<QualityDataSchema>;

declare class QualityAFMBE<TParent extends CharacterAFMBE | null = CharacterAFMBE | null> extends ItemAFMBE<TParent> {
    _source: QualitySource;
    system: QualityDataModel;
}

type QualitySource = ItemSource<"quality", QualityDataSource>;

export type {
    QualityAFMBE,
    QualityCategory,
    QualityDataSchema,
    QualityDataSource,
    QualityLevel,
    QualitySource,
    QualityType,
};
