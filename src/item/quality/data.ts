import { PositiveIntegerField } from "fields";
import { ItemAFMBE, ItemDataModel, ItemDataSource } from "item";
import * as R from "remeda";
import { localize } from "utils";
import {
    QualityAFMBE,
    QUALITY_CATEGORIES,
    QUALITY_TYPES,
    QualityDataSchema,
    QualityDataSource,
    QualitySource,
} from ".";
import fields = foundry.data.fields;

class QualityDataModel<TParent extends QualityAFMBE = QualityAFMBE> extends ItemDataModel<TParent, QualityDataSchema> {
    static defineSchema(): QualityDataSchema {
        return {
            ...super.defineSchema(),
            category: new fields.StringField({
                required: true,
                nullable: false,
                initial: "mental",
                choices: QUALITY_CATEGORIES,
            }),
            level: new fields.SchemaField({
                cost: new PositiveIntegerField({ min: 1 }),
                max: new PositiveIntegerField({ min: 1 }),
                value: new PositiveIntegerField({ min: 1 }),
            }),
            type: new fields.StringField({
                required: true,
                nullable: false,
                initial: "quality",
                choices: QUALITY_TYPES,
            }),
        };
    }

    get cost(): number {
        return this.level.value * this.level.cost;
    }

    static prepareSourceFromElement(el: HTMLElement): PreCreate<QualitySource> {
        const { systemType = "quality" } = el.dataset;
        const source = super.prepareSourceFromElement(el) as PreCreate<QualitySource>;

        source.name = localize("afmbe.item.quality.type", systemType);

        if (systemType === "drawback") {
            source.system ??= {};
            source.system.type = "drawback";
        }

        return source;
    }

    async _preCreate(data: DeepPartial<QualitySource>): Promise<boolean | void> {
        const updates: Record<string, any> = {};

        if (this.level.value > this.level.max) {
            updates["level.value"] = this.level.max;
        }

        if (this.type === "drawback" && this.item.img === ItemAFMBE.DEFAULT_ICONS.quality) {
            updates.img = ItemAFMBE.DEFAULT_ICONS.drawback;
        } else if (this.type === "quality" && this.item.img === ItemAFMBE.DEFAULT_ICONS.drawback) {
            updates.img = ItemAFMBE.DEFAULT_ICONS.quality;
        }

        if (R.keys(updates).length) {
            this.item.updateSource(updates);
        }
    }

    async _preUpdate(changes: DeepPartial<QualitySource>): Promise<boolean | void> {
        if (R.isNumber(changes.system?.level?.value)) {
            const total = changes.system?.level?.max ?? this.level.max;

            if (changes.system.level.value > total) {
                changes.system.level.value = total;
            }
        }

        if (R.isString(changes.system?.type)) {
            if (changes.system.type === "drawback" && this.item.img === ItemAFMBE.DEFAULT_ICONS.quality) {
                changes.img = ItemAFMBE.DEFAULT_ICONS.drawback;
            } else if (changes.system.type === "quality" && this.item.img === ItemAFMBE.DEFAULT_ICONS.drawback) {
                changes.img = ItemAFMBE.DEFAULT_ICONS.quality;
            }
        }
    }
}

interface QualityDataModel<TParent extends QualityAFMBE = QualityAFMBE> extends Omit<
    QualityDataSource,
    keyof ItemDataSource
> {}

export { QualityDataModel };
