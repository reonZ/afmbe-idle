import { ItemDataModel, ItemDataSource } from "item";
import { Quality, QUALITY_CATEGORIES, QUALITY_TYPES, QualityDataSchema, QualityDataSource } from ".";
import fields = foundry.data.fields;

class QualityDataModel<TParent extends Quality = Quality> extends ItemDataModel<TParent, QualityDataSchema> {
    static defineSchema(): QualityDataSchema {
        return {
            ...super.defineSchema(),
            category: new fields.StringField({
                required: true,
                nullable: false,
                initial: "mental",
                choices: QUALITY_CATEGORIES,
            }),
            type: new fields.StringField({
                required: true,
                nullable: false,
                initial: "both",
                choices: QUALITY_TYPES,
            }),
        };
    }
}

interface QualityDataModel<TParent extends Quality = Quality> extends Omit<QualityDataSource, keyof ItemDataSource> {}

export { QualityDataModel };
