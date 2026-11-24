import { DataModelConstructionContext } from "@7h3laughingman/foundry-types/common/abstract/_types.mjs";
import { ItemDataModel, ItemDataSource } from "item";
import { Quality, QUALITY_CATEGORIES, QualityDataSchema, QualityDataSource, QualityType } from ".";
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
            level: new fields.NumberField({
                required: true,
                nullable: false,
                initial: 1,
            }),
            range: new fields.SchemaField({
                max: new fields.NumberField({
                    required: true,
                    nullable: false,
                    initial: 1,
                }),
                min: new fields.NumberField({
                    required: true,
                    nullable: false,
                    initial: 1,
                }),
            }),
        };
    }

    get isQuality() {
        return this.range.min > 0;
    }

    get type(): QualityType {
        const { max, min } = this.range;
        return max > 0 && min > 0 ? "quality" : max < 0 && min < 0 ? "drawback" : "both";
    }

    protected _initializeSource(data: object, options?: DataModelConstructionContext<TParent>): this["_source"] {
        const source = super._initializeSource(data, options);

        if (source.range.min === 0 || source.range.min > 1) {
            source.range.min = 1;
        }

        if (source.range.max === 0) {
            source.range.max = 1;
        } else if (source.range.max < -1) {
            source.range.max = source.range.min > 0 ? 1 : -1;
        }

        if (source.level === 0) {
            source.level = source.range.max > 0 ? 1 : -1;
        } else {
            source.level = Math.clamp(source.level, source.range.min, source.range.max);
        }

        return source;
    }
}

interface QualityDataModel<TParent extends Quality = Quality> extends Omit<QualityDataSource, keyof ItemDataSource> {}

export { QualityDataModel };
