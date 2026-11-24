import { ValueField } from "fields";
import { ItemAFMBE, ItemDataModel, ItemDataSource } from "item";
import * as R from "remeda";
import { Quality, QUALITY_CATEGORIES, QualityDataSchema, QualityDataSource, QualitySource, QualityType } from ".";
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
            level: new ValueField(
                new fields.NumberField({
                    required: true,
                    nullable: false,
                    initial: 1,
                }),
            ),
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

    get isDrawback(): boolean {
        return this.level.value < 0;
    }

    get isQuality() {
        return this.level.value > 0;
    }

    get type(): QualityType {
        const { max, min } = this.range;
        return max > 0 && min > 0 ? "quality" : max < 0 && min < 0 ? "drawback" : "both";
    }

    async _preCreate(data: DeepPartial<QualitySource>): Promise<boolean | void> {
        const updates = this.#createSourceUpdates(this.item, data);

        if (updates) {
            this.item.updateSource(updates);
        }
    }

    async _preUpdate(changes: DeepPartial<QualitySource>): Promise<boolean | void> {
        const updates = this.#createSourceUpdates(this.item, changes);

        if (updates) {
            foundry.utils.mergeObject(changes, updates);
        }
    }

    #createSourceUpdates(item: Quality, data: DeepPartial<QualitySource>): Record<string, any> | null {
        const updates: Record<string, any> = {};

        if (R.isNumber(data.system?.range?.min) && (data.system.range.min === 0 || data.system.range.min > 1)) {
            updates["system.range.min"] = 1;
        }

        const min: number = updates["system.range.min"] ?? item.system.range.min;

        if (R.isNumber(data.system?.range?.max)) {
            if (data.system.range.max === 0) {
                updates["system.range.max"] = 1;
            } else if (data.system.range.max < -1) {
                updates["system.range.max"] = min > 0 ? 1 : -1;
            }
        }

        const max: number = updates["system.range.max"] ?? item.system.range.max;

        if (R.isNumber(data.system?.level?.value)) {
            if (data.system.level.value === 0) {
                updates["system.level.value"] = max > 0 ? 1 : -1;
            } else {
                updates["system.level.value"] = Math.clamp(data.system.level.value, min, max);
            }
        }

        const level = updates["system.level.value"] ?? item.system.level.value;
        const img = data.img ?? item.img;

        if (level < 0 && img === ItemAFMBE.DEFAULT_ICONS.quality) {
            updates.img = ItemAFMBE.DEFAULT_ICONS.drawback;
        } else if (level > 0 && img === ItemAFMBE.DEFAULT_ICONS.drawback) {
            updates.img = ItemAFMBE.DEFAULT_ICONS.quality;
        }

        return R.keys(updates).length ? updates : null;
    }
}

interface QualityDataModel<TParent extends Quality = Quality> extends Omit<QualityDataSource, keyof ItemDataSource> {}

export { QualityDataModel };
